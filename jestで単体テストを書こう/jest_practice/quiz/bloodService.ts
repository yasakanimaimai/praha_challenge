import axios from "axios";

export class BloodService {

  public constructor() {}

  private TRANSFUSIBLE_BLOOD_TYPE: {[key: string]: string[]} = {
    'A' : ['A', 'AB'],
    'B' : ['B', 'AB'],
    'O' : ['A', 'B', 'O', 'AB'],
    'AB': ['AB'],
  };

  public calcDeadBleedingMlFromBodyWeghtKg(bodyWeightKg: number): number {
    if (bodyWeightKg <= 0) {
      return 0;
    }
    const bloodAmount = bodyWeightKg * 1000 / 13;
    const deadBleedingML = bloodAmount * 40 / 100;

    return deadBleedingML;
  }

  public getTransfusibleBlood(bloodType: string): string[] {
    return this.TRANSFUSIBLE_BLOOD_TYPE[bloodType];
  }

  public async getBloodType(addRhOption: boolean = false): Promise<{[key:string]: any}> {
    const { data } = await axios.get(
      "https://random-data-api.com/api/v2/blood_types"
    );

    let result = {
      'bloodType': data.type as string
    };

    if (addRhOption) {
      result['rh'] = data.rh_factor as string;
    }

    return result;
  }
}
