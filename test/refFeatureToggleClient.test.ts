import { RefFeatureToggleClient } from '../src/refFeatureToggleClient';
import { FeatureToggleRules } from '../src/featureToggleRules';

const validRules: FeatureToggleRules = {
  features: [
    {
      name: 'Feature1',
      treatments: [
        { name: 'Treatment1A', includedDifferentiators: ['A', 'B', 'C'] },
        { name: 'Treatment1B', includedDifferentiators: ['D', 'E', 'F'] }
      ]
    },
    {
      name: 'Feature2',
      treatments: [
        { name: 'Treatment2A', includedDifferentiators: ['G', 'H', 'I'] },
        { name: 'Treatment2B', includedDifferentiators: [] }
      ]
    },
    {
      name: 'Feature3',
      treatments: [
        { name: 'Enabled', includedDifferentiators: [] },
        { name: 'Disabled', includedDifferentiators: ['J', 'K', 'L', 'M'] }
      ]
    }
  ]
};

describe('RefFeatureToggleClient', () => {
  it('should return default value when featureName does not exist', async () => {
    // Arrange
    const client = new RefFeatureToggleClient(validRules);
    const featureName = 'NOT EXIST';
    const differentiator = 'NOT EXIST';
    const defaultTreatment = 'DEFAULT TREATMENT';

    // Act
    const result = await client.getTreatment(featureName, differentiator, defaultTreatment);

    // Assert
    expect(result).toBe(defaultTreatment);
  });

  it('should return default value when differentiator does not exist', async () => {
    // Arrange
    const client = new RefFeatureToggleClient(validRules);
    const featureName = 'Feature1';
    const differentiator = 'NOT EXIST';
    const defaultTreatment = 'DEFAULT TREATMENT';

    // Act
    const result = await client.getTreatment(featureName, differentiator, defaultTreatment);

    // Assert
    expect(result).toBe(defaultTreatment);
  });

  it('should return default value when differentiator is related to another feature', async () => {
    // Arrange
    const client = new RefFeatureToggleClient(validRules);
    const featureName = 'Feature1';
    const differentiator = 'G';
    const defaultTreatment = 'DEFAULT TREATMENT';

    // Act
    const result = await client.getTreatment(featureName, differentiator, defaultTreatment);

    // Assert
    expect(result).toBe(defaultTreatment);
  });

  it('should return defined value when rule matches', async () => {
    // Arrange
    const client = new RefFeatureToggleClient(validRules);
    const featureName = 'Feature2';
    const differentiator = 'G';
    const defaultTreatment = 'DEFAULT TREATMENT';
    const expectedTreatment = 'Treatment2A';

    // Act
    const result = await client.getTreatment(featureName, differentiator, defaultTreatment);

    // Assert
    expect(result).toBe(expectedTreatment);
  });

  it('should accept rules updates', async () => {
    // Arrange
    const mutatingRules: FeatureToggleRules = {
      features: [
        {
          name: 'Feature1',
          treatments: [
            { name: 'Treatment1A', includedDifferentiators: ['A', 'B', 'C'] },
            { name: 'Treatment1B', includedDifferentiators: ['D', 'E', 'F'] }
          ]
        }
      ]
    };

    const client = new RefFeatureToggleClient(mutatingRules);
    const featureName = 'Feature2';
    const differentiator = 'G';
    const defaultTreatment = 'DEFAULT TREATMENT';
    const expectedTreatment = 'Treatment2A';

    const preresult = await client.getTreatment(featureName, differentiator, defaultTreatment);
    expect(preresult).toBe(defaultTreatment);

    // Act
    mutatingRules.features.push({
      name: 'Feature2',
      treatments: [
        { name: 'Treatment2A', includedDifferentiators: ['G', 'H', 'I'] },
        { name: 'Treatment2B', includedDifferentiators: [] }
      ]
    });
    const result = await client.getTreatment(featureName, differentiator, defaultTreatment);

    // Assert
    expect(result).toBe(expectedTreatment);
  });
});
