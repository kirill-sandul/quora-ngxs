export class ReactiveFormErrors {
  required(prop: string){
    return `Вы должны ввести ${prop}`;
  }

  minlength(required_length: number){
    return `Поле должно содержать не меньше ${required_length} символов`;
  }

  tags_max_length(){
    return `Вы можете ввести не больше 5 тэгов`;
  }
}