// コード元：https://www.typescriptlang.org/play?#code/MYGwhgzhAEAKCmAnCB7AdtA3gWAFDQOgAcBXAIxAEtho0wBbeALmggBdFK0BzPQ48lRrswiAOopEAay7cAgmxYARMG3h9CwdO0QlgbSQAo6jFjtkAaVm1FsJ02QuWr4ASiwb+BNgAtKEADoTeGgAXloGdXwvbz9AkXFJGR4FMOtbe2T5Nk9oAF88Atw8UEgYAGEUeiIwNABPD2iCUgpqYngUIhBmOCRUNABtAF1crTQdPQNEQyIOrp6EZHRh9xwmr19-ANnO7rSd+dyiopLtNmgtatqG8LR4AHdoSqv6wwG7x8X+wwByMB+rB9oCo1L8AEwABjBAEYALQQuEIn6uVyAh69JZoX5kAG0dEg+DgqGIuHQ5GuIauU7jc4AM0oyDYX3QaUuNXq2zm3QGEJGxVwAHoBdBAKrygEiGQDSDIA7BkAtwyADoZAMMMgHqGQDWDIB-eUAFK6ATQZANEMgH0GQCBDIBABmZGDkUsAJ0qATaVANGpgGnNQCnpoAkhkAa8qAKIZAF+KWup7GgABMXGl6YzTQEEplHDl+ULoIBVBkAfgyANQZ44ArBnlysA5gyawDqDIAzBkAIgw6lMSjOAEqjAMYMucAL2aABtM89n44AxBjwAbUYfgbAAYiQQCAAJrwUSGaEQ0dU3DB9ih4JpH70FB+yj0+B+iKMH54H0oboBEAobiGNnXdwxo-1KWAWjkVYBqFXjgBiGAt603Qc3W+0OwAyDIBITUA8QyVhuNoAgP94EAA
class Person {
  public name: string
  public startWorkingAt: Date
  constructor(name: string, startWorkingAt: Date) {
      this.name = name
      this.startWorkingAt = startWorkingAt
  }
}

class Company {
  public people: Person[]
  constructor(people: Person[]) {
      this.people = people
  }
}

const company = new Company(
  [
    new Person('a', new Date('2021-01-01')),
    new Person('b', new Date('2021-01-1'))
  ]
);
const firstPerson = company.people[0]

// 何らかのロジックに使用するため、Person Aの勤務開始日を取り出す
const date = firstPerson.startWorkingAt

// さまざまなロジックで使用しているなかで誤って更新してしまう
date.setFullYear(1000)
firstPerson.name = 'modified name'

console.log(company) // companyの中に含まれていたPerson Aの勤務開始日が変わってしまう！
