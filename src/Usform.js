import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Usform extends Component {
    constructor() {
        super();
        this.state = {
            EmployeeId: '',
            EmployeeName: '',
            Age: '',
            Gender: '',
            CountryCode: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        console.log(this.props);
        this.setState({
            CountryCode: this.props.country,
            ...this.props.record
        });
    }

    handleInput(ev) {
        let obj = {};
        obj[ev.target.name] = ev.target.value;
        this.setState(obj);
        console.log(this.state);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.state);
        const data = {
            "EmployeeName": this.state.EmployeeName,
            "Age": this.state.Age,
            "DOB": this.state.DOB,
            "Gender": this.state.Gender,
            "CountryCode": this.state.CountryCode

        };
        let url = '/api/InsertEmployee';
        if (this.state.EmployeeId) {
            data.EmployeeId = this.state.EmployeeId;
            url = '/api/UpdateEmployee'
        }
        console.log(data);
        axios({
            method: 'POST',
            url: url,
            baseURL: 'http://webapiappwipro.azurewebsites.net',
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            this.props.getEmployess();
            if (res.data === 'Success') {
                alert('Success');
                this.setState({
                    EmployeeId: '',
                    EmployeeName: '',
                    Age: '',
                    DOB: '',
                    Gender: '',
                    CountryCode: '',
                });
                this.props.handleCancel()
            } else {
                alert('Failure');
            }
        })
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="EmployeeName" type="text" value={this.state.EmployeeName} onChange={(ev) => {
                            this.handleInput(ev)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>DOB</label>
                        <input name="DOB" type="date" value={this.state.DOB} onChange={(ev) => {
                            this.handleInput(ev)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <input name="Gender" value="M" type="radio" checked={this.state.Gender === 'M'}
                               onChange={(ev) => {
                                   this.handleInput(ev)
                               }}/>Male
                        <input name="Gender" value="F" type="radio" checked={this.state.Gender === 'F'}
                               onChange={(ev) => {
                                   this.handleInput(ev)
                               }}/>Female
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={this.props.handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Usform;
