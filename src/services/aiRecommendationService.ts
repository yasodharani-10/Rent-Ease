import { Property, PreferredTenant } from '../types';

export interface RecommendationCriteria {
  maxBudget: number;
  tenantType: PreferredTenant;
  preferredArea?: string;
  nearCollegeOnly?: boolean;
  minBedrooms?: number;
  furnishingPreference?: 'Any' | 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  requiredAmenities?: string[];
}

export interface RecommendationResult {
  property: Property;
  score: number; // 0 - 100
  matchReasons: string[];
  caveats: string[];
}

export const aiRecommendationService = {
  getRecommendations(
    properties: Property[],
    criteria: RecommendationCriteria
  ): RecommendationResult[] {
    const results: RecommendationResult[] = properties.map((prop) => {
      let score = 50; // Base score
      const matchReasons: string[] = [];
      const caveats: string[] = [];

      // 1. Budget scoring (Weight: 30)
      if (prop.monthlyRent <= criteria.maxBudget) {
        const budgetDelta = criteria.maxBudget - prop.monthlyRent;
        const budgetBonus = Math.min(25, Math.round((budgetDelta / criteria.maxBudget) * 25));
        score += 15 + budgetBonus;
        matchReasons.push(`₹${prop.monthlyRent.toLocaleString('en-IN')}/mo is comfortably within your ₹${criteria.maxBudget.toLocaleString('en-IN')} limit.`);
      } else {
        const overBudget = prop.monthlyRent - criteria.maxBudget;
        score -= Math.min(35, Math.round((overBudget / criteria.maxBudget) * 35));
        caveats.push(`₹${overBudget.toLocaleString('en-IN')} above your preferred monthly budget.`);
      }

      // 2. Tenant profile match (Weight: 20)
      if (criteria.tenantType !== 'All') {
        if (prop.preferredTenant === criteria.tenantType || prop.preferredTenant === 'All') {
          score += 20;
          matchReasons.push(`Property owner welcomes ${criteria.tenantType.toLowerCase()}.`);
        } else {
          score -= 15;
          caveats.push(`Owner prefers ${prop.preferredTenant.toLowerCase()}; may require prior discussion.`);
        }
      }

      // 3. Proximity to college campus (Weight: 20)
      if (criteria.nearCollegeOnly) {
        if (prop.distanceToCollegeKm && prop.distanceToCollegeKm <= 1.0) {
          score += 20;
          matchReasons.push(`Prime student corridor: only ${prop.distanceToCollegeKm} km from college campus.`);
        } else if (prop.distanceToCollegeKm && prop.distanceToCollegeKm <= 2.5) {
          score += 10;
          matchReasons.push(`Convenient cycling/bus distance (${prop.distanceToCollegeKm} km).`);
        } else {
          score -= 10;
          caveats.push(`Situated ${prop.distanceToCollegeKm || 'several'} km from Markapur college clusters.`);
        }
      }

      // 4. Furnishing match (Weight: 15)
      if (criteria.furnishingPreference && criteria.furnishingPreference !== 'Any') {
        if (prop.furnishing === criteria.furnishingPreference) {
          score += 15;
          matchReasons.push(`Exact furnishing match: ${prop.furnishing}.`);
        } else {
          score -= 5;
        }
      }

      // 5. Bedrooms match (Weight: 10)
      if (criteria.minBedrooms && criteria.minBedrooms > 0) {
        if (prop.bedrooms >= criteria.minBedrooms) {
          score += 10;
          matchReasons.push(`Meets bedroom requirement (${prop.bedrooms} Bed${prop.bedrooms > 1 ? 's' : ''}).`);
        } else {
          score -= 20;
          caveats.push(`Fewer bedrooms (${prop.bedrooms}) than requested.`);
        }
      }

      // 6. Required amenities bonus
      if (criteria.requiredAmenities && criteria.requiredAmenities.length > 0) {
        const matchingAmenities = criteria.requiredAmenities.filter(req =>
          prop.amenities.some(a => a.toLowerCase().includes(req.toLowerCase()))
        );
        if (matchingAmenities.length > 0) {
          score += Math.min(15, matchingAmenities.length * 5);
          matchReasons.push(`Includes ${matchingAmenities.join(', ')}.`);
        }
      }

      // 7. Area preference bonus
      if (criteria.preferredArea && criteria.preferredArea !== 'All Areas in Markapur') {
        if (prop.areaName.toLowerCase().includes(criteria.preferredArea.toLowerCase()) ||
            prop.location.toLowerCase().includes(criteria.preferredArea.toLowerCase())) {
          score += 10;
          matchReasons.push(`Located directly in your target locality (${prop.areaName}).`);
        }
      }

      // Clamp score between 10 and 99
      const finalScore = Math.max(15, Math.min(98, score));

      return {
        property: prop,
        score: finalScore,
        matchReasons: matchReasons.slice(0, 3),
        caveats: caveats.slice(0, 2),
      };
    });

    // Sort descending by match score
    return results.sort((a, b) => b.score - a.score);
  }
};
