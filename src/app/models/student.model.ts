export interface Student {
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  enrollmentDate: string;
  degree: number;
  gpa: number;
  id: string;
}

export default class StudentModel {
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  enrollmentDate: string;
  degree: number;
  gpa: number;
  id: string;

  constructor(data: Student) {
    this.firstName = data.firstName;
    this.middleInitial = data.middleInitial;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.gender = data.gender;
    this.address = data.address;
    this.phoneNumber = data.phoneNumber;
    this.emailAddress = data.emailAddress;
    this.enrollmentDate = data.enrollmentDate;
    this.degree = data.degree;
    this.gpa = data.gpa;
    this.id = data.id;
  }
}