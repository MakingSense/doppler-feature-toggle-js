export interface FeatureToggleRules {
  features: Feature[];
}

interface Feature {
  name: string;
  treatments: Treatment[];
}

interface Treatment {
  name: string;
  includedDifferentiators: string[];
}
