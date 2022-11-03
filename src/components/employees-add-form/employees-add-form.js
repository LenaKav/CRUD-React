import {Component} from "react";
import './employees-add-form.css';
import FormErrors from '../form-errors/FormErrors';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
            this.state = {
                name: '',
                salary: '',
                formErrors: { name: '', salary: '' },
                nameValid: false,
                salaryValid: false,
                formValid: false
            }
        }

        onValueChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            }, () => { this.validateField(e.target.name, e.target.value) });
        }

        validateField(fieldName, value) {
            let fieldValidationErrors = this.state.formErrors;
            let nameValid = this.state.nameValid;
            let salaryValid = this.state.salaryValid;

            switch(fieldName) {
                case 'name':
                    nameValid = value.length >= 3;
                    fieldValidationErrors.name = nameValid ? '' : ' is too short';
                    break;
                case 'salary':
                    salaryValid = value > 0;
                    fieldValidationErrors.salary = salaryValid ? '': ' enter value';
                    break;
                default:
                    break;
            }
            this.setState({
                formErrors: fieldValidationErrors,
                nameValid: nameValid,
                salaryValid: salaryValid
            }, this.validateForm);
        }

        validateForm() {
            console.log('this', this.state)
            this.setState({
                formValid: this.state.nameValid && this.state.salaryValid
            });
        }

        errorClass(error) {
            return(error.length === 0 ? '' : 'has-error');
        }

        onSubmit = (e) => {
            e.preventDefault();
            this.props.onAdd(this.state.name, this.state.salary);
            this.setState({
                name: '',
                salary: '',
                nameValid: false,
                salaryValid: false,
                formValid: false
            })
        }

        render() {
            const {name, salary} = this.state;

           return (
               <div className="app-add-form">
                   <h3>Добавьте нового сотрудника</h3>
                   <form
                       className="add-form d-flex"
                       onSubmit = {this.onSubmit}>
                       <input
                           type="text"
                              className= {`form-group ${this.errorClass(this.state.formErrors.name)} form-control new-post-label`}
                              placeholder="Как его зовут?"
                              name='name'
                              value={name}
                       onChange={this.onValueChange}/>
                       <input type="number"
                              className= {`form-group ${this.errorClass(this.state.formErrors.salary)} form-control new-post-label`}
                              placeholder="З/П в $?"
                              name='salary'
                              value={salary}
                       onChange={this.onValueChange}/>
                       <FormErrors formErrors={this.state.formErrors} />
                       <button type="submit"
                               className="btn btn-outline-light"
                               disabled={!this.state.formValid}>Добавить</button>
                   </form>
               </div>
           )
       }
    }

    export default EmployeesAddForm;