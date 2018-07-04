import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Emplist extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        console.log(this.props);
        if (this.props.record) {

        }
    }

    componentWillReceiveProps() {

    }

    render() {
        return (
            <div className="App">
                <table>
                    <thead>
                    <tr>
                        <td>Sr.No</td>
                        <td>EmpId</td>
                        <td>Name</td>
                        <td>DOB</td>
                        <td>Age</td>
                        <td>Gender</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.employees.filter(a => {return this.props.country=='' || a.CountryCode == this.props.country}).map((emp, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{emp.EmployeeId}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.DOB}</td>
                            <td>{emp.Age}</td>
                            <td>{emp.Gender}</td>
                            <td><a className={'cur-poi'} onClick={(ev) => {
                                this.props.handleOnEdit(emp)
                            }}>Edit</a> | <a>Delete</a></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Emplist;
