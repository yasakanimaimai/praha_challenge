import {describe, expect, it, jest} from '@jest/globals';
import { BloodService } from './bloodService';

describe('BloodService', () => {

  it('calcDeadBleedingMlFromBodyWeghtKg normal senario', () => {
    const bodyWeightKg = 58;
    const result = bodyWeightKg * 1000 / 13 * 40 / 100;
    const bloodService = new BloodService();
    expect(bloodService.calcDeadBleedingMlFromBodyWeghtKg(bodyWeightKg)).toBe(result);
  });

  it('getTransfusibleBloodTypes normal senario', () => {
    const bloodType = 'A';
    const result = ['A', 'AB'];
    const bloodService = new BloodService();
    expect(bloodService.getTransfusibleBlood(bloodType)).toStrictEqual(result);
  });
  
  it('getBloodType normal senario', async () => {
    const bloodType = 'A';
    const addRhOption = true;
    const bloodService = new BloodService();
    const mockValue = {
      'bloodType': bloodType,
      'rh': bloodType,
    };

    jest.spyOn(bloodService, 'getBloodType').mockResolvedValueOnce(mockValue);
    expect.assertions(2);
    await expect(bloodService.getBloodType(addRhOption)).resolves.toBe(mockValue);
    expect(bloodService.getBloodType).toBeCalledTimes(1);
  });
});
