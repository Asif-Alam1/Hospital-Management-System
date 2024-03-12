import { Injectable } from "@nestjs/common";
export interface Department {
    id: string;
    name: string;
    location: string
}

@Injectable()
export class DepartmentService {
private readonly Departments: Department[] = [];

create(department:Department): Department {
  department.id = (this.Departments.length + 1).toString();
    this.Departments.push(department);
    return department;
}

findAll(): Department[] {
    return this.Departments;
}


findOne(id: string): Department {
    const department= this.Departments.find(department => department.id === id);
  if(department){
    return department;
  }else{
    throw new Error('Department not found');

  }
}


deleteOne(id: string): void {
  if(this.Departments.findIndex(department => department.id === id) === -1)
    throw new Error('Department not found');
  else
    this.Departments.splice(this.Departments.findIndex(department => department.id === id), 1);
}

updateOne(id: string, department: Department): Department {
    if(this.Departments.findIndex(department => department.id === id) === -1)
      throw new Error('Department not found');



    const index = this.Departments.findIndex(department => department.id === id);
    department.id = id;
    this.Departments[index] = department;
    return department;
}

}