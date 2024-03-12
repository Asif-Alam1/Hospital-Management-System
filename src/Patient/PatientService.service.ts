import { Injectable } from "@nestjs/common";

export interface Patient {
    id: string;
    name: string;
    age: number;
    doctorId: string;
}
@Injectable()
export class PatientService {
private readonly Patients: Patient[] = [];
create(patient:Patient): Patient {
  patient.id = (this.Patients.length + 1).toString();
    this.Patients.push(patient);
    return patient;
}
findAll(): Patient[] {
    return this.Patients;
}

findOne(id: string): Patient {
  if(this.Patients.findIndex(patient => patient.id === id) === -1)
    throw new Error('Patient not found');
  else
    return this.Patients.find(patient => patient.id === id);
}

deleteOne(id: string): void {
  if(this.Patients.findIndex(patient => patient.id === id) === -1)
    throw new Error('Patient not found');
  else
    this.Patients.splice(this.Patients.findIndex(patient => patient.id === id), 1);

}

updateOne(id: string, patient: Patient): Patient {
  if(this.Patients.findIndex(patient => patient.id === id) === -1)
    throw new Error('Patient not found');
  patient.id = id;
  const index = this.Patients.findIndex(patient => patient.id === id);
  this.Patients[index] = patient;
  return patient;
}
}