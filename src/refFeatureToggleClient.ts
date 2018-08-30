import { FeatureToggleClient } from './featureToggleClient';
import { FeatureToggleRules } from './featureToggleRules';

/**
 * Feature-Toggle client based on a referenced object
 */
export class RefFeatureToggleClient implements FeatureToggleClient {
  public constructor(private rules: FeatureToggleRules) {}

  /**
   * Determine the treatment as string based on feature name, differentiator and default treatment
   * and current loaded rules.
   */
  public async getTreatment(
    featureName: string,
    differentiator: string,
    defaultTreatment: string
  ): Promise<string> {
    const feature = this.rules.features.find(x => x.name === featureName);
    if (feature) {
      const treatment = feature.treatments.find(x =>
        x.includedDifferentiators.includes(differentiator)
      );
      if (treatment) {
        return treatment.name;
      }
    }
    return defaultTreatment;
  }
}
