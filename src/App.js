import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Emplist from './emplist';
import Indiaform from './Indiaform';
import Usform from './Usform';
import axios from 'axios';

class App extends Component {
    countries = [
        {name: 'India', value: 'IN'},
        {name: 'United States', value: 'US'},
    ];

    constructor() {
        super();
        this.state = {
            selectedCountry: '',
            employees: [],
            employeesLoading: false,
            record: null,
        };
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.getEmployess = this.getEmployess.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount() {
        this.getEmployess();
    }

    handleCountryChange(val) {
        this.setState({selectedCountry: val, record: {}});
    }

    getEmployess() {
        this.setState({employeesLoading: true});
        axios({
            method: 'GET',
            url: '/api/GetAllEmployee',
            baseURL: 'http://webapiappwipro.azurewebsites.net',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.status === 'success') {
                this.setState({employees: res.data.data})
            }
            this.setState({employeesLoading: false});
        })
    }

    handleOnEdit(data) {
        this.setState({
            record: data,
            selectedCountry: data.CountryCode
        });
        console.log(this.state);
    }

    handleCancel() {
        this.setState({
            record: null,
            selectedCountry: '',
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="App">
                <header>
                    <h1 className="App-title">Test</h1>
                </header>
                <select name="country" value={this.state.selectedCountry} onChange={(ev) => {
                    this.handleCountryChange(ev.target.value)
                }}>
                    <option value="">Select country</option>
                    {this.countries.map((a, i) => {
                        return <option value={a.value} key={i}> {a.name}</option>
                    })}
                </select>

                {(this.state.selectedCountry && this.state.record && this.state.selectedCountry === 'IN' ) ?
                    <Indiaform country={this.state.selectedCountry}
                               record={this.state.record}
                               handleCancel={this.handleCancel}
                               getEmployess={this.getEmployess}></Indiaform> : ''}

                {(this.state.selectedCountry && this.state.record && this.state.selectedCountry === 'US' ) ?
                    <Usform country={this.state.selectedCountry}
                               record={this.state.record}
                               handleCancel={this.handleCancel}
                               getEmployess={this.getEmployess}></Usform> : ''}


                <div>{this.state.employeesLoading ? 'Loading employess...' :
                    <Emplist employees={this.state.employees} country={this.state.selectedCountry} handleOnEdit={this.handleOnEdit}></Emplist>}
                </div>

            </div>
        );
    }
}

export default App;
