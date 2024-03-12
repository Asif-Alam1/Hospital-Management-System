import { Injectable } from "@nestjs/common";

export interface Doctor {
    id: string;
    name: string;
    DepartmentId: string;
}

@Injectable()
export class DoctorService {
    private readonly Doctors: Doctor[] = [];
    create(doctor:Doctor): Doctor {
        doctor.id = (this.Doctors.length + 1).toString();
        this.Doctors.push(doctor);
        return doctor;
    }

    findAll(): Doctor[] {
        return this.Doctors;
    }

    findOne(id: string): Doctor {
        const doctor= this.Doctors.find(doctor => doctor.id === id);
        if(doctor){
            return doctor;
        }else{
            throw new Error('Doctor not found');
        }
    }

    deleteOne(id: string): void {
      if(this.Doctors.findIndex(doctor => doctor.id === id) !== -1)
        this.Doctors.splice(this.Doctors.findIndex(doctor => doctor.id === id), 1);
      else
        throw new Error('Doctor not found');
    }

    updateOne(id: string, doctor: Doctor): Doctor {

        if(this.Doctors.findIndex(doctor => doctor.id === id) === -1)
          throw new Error('Doctor not found');

        const index = this.Doctors.findIndex(doctor => doctor.id === id);
        doctor.id = id;
        this.Doctors[index] = doctor;
        return doctor;
    }
}