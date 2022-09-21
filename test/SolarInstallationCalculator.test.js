import { beforeEach, describe, expect, it } from 'vitest';
import SolarInstallationCalculator from '../src/solarInstallationCalculator';

describe('SolarInstallationCalculator tests with default values', function() {
  let calculator;

  beforeEach(function() {
    calculator = new SolarInstallationCalculator();
  });

  it('should return correct value for an area of 1 meter squared ', function() {
    const result = calculator.getNominalPower(1);
    expect(result).toBe(250);
  });

  it('should return correct value for an area of 100 meters squared ', function() {
    const result = calculator.getNominalPower(500);
    expect(result).toBe(125000);
  });
})

describe('SolarInstallationCalculator tests with 30% solar panel efficiency', function() {
  let calculator;

  beforeEach(function() {
    calculator = new SolarInstallationCalculator(0.3);
  });

  it('should return correct value for an area of 1 meter squared ', function() {
    const result = calculator.getNominalPower(1);
    expect(result).toBe(300);
  });

  it('should return correct value for an area of 100 meters squared ', function() {
    const result = calculator.getNominalPower(500);
    expect(result).toBe(150000);
  });
});

describe('SolarInstallationCalculator tests with the most super efficient panels that ever lived and on Mercury', function() {
  let calculator;

  beforeEach(function() {
    calculator = new SolarInstallationCalculator(0.9, 5000) ;
  });

  it('should return correct value for an area of 1 meter squared ', function() {
    const result = calculator.getNominalPower(1);
    expect(result).toBe(4500);
  });

  it('should return correct value for an area of 500 meters squared ', function() {
    const result = calculator.getNominalPower(500);
    expect(result).toBe(2250000);
  });
});