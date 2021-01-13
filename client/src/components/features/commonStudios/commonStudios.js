import axios from 'axios'
import React, { Component }  from 'react'
import BarGraph from './barGraph'

class commonStudios extends Component {
    state = {
        userName: "",
        upper: 0,
        lower: 0,
        commonStudioCount: 0,
        studios : null
    }

    handleInputChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value //[] is the value of the variable
        })
    }

    validateTask = (task) => {
        if (task.userName.length === 0 || task.upper.length === 0 || task.lower.length === 0 || task.commonCount.length === 0 ) {
            return false
        } else if (isNaN(task.upper) || isNaN(task.lower) || isNaN(task.commonCount)) {
            return false
        } else if (task.commonCount < 1) {
            return false
        }
        return true
    }

    getCommonStudios = (e) => {
        e.preventDefault(); //Prevents page/console reload

        const task = {
            userName: this.state.userName,
            upper: parseInt(this.state.upper),
            lower: parseInt(this.state.lower),
            commonCount: parseInt(this.state.commonStudioCount)
        }

        if (this.validateTask(task)) {
            console.log("Sending request.")
            console.log(task)
            axios({
                method: "post",
                url : "http://localhost:5000/api/commonStudios",
                data : task
            })
            .then(
                (response) => {
                    this.setState({
                        studios : response.data.studios
                    })
                    console.log(this.state)

                    //contentDiv = document.getElementsByClassName("output");
                    //barGraph = <BarGraph data = {this.state.studios}/>
                    //contentDiv.appendChild(barGraph)
                    //Change format of data returned from the back end
                    //Add <BarGraph data = {this.state.studios}/> to the div with className = output
                }
            )
            .catch(
                (error) => {
                    console.log(error.response.data)
                }
            )
        } else {
            alert("Bad inputs, try again")
        }
    }
    
    render () {
        return (
            <div>
                <div className = "input">
                    <form onSubmit={this.getCommonStudios}>
                        <label>
                            MyAnimeList Username:
                            <input
                                name = "userName"
                                type = "text"
                                value = {this.state.userName}
                                onChange = {this.handleInputChange}
                            /> 
                        </label>
                        <br/>
                        <label>
                            Upper Score:
                            <input
                                name = "upper"
                                type = "number"
                                value = {this.state.upper}
                                onChange = {this.handleInputChange}
                                min = "0"
                                max = "10"
                            /> 
                        </label>
                        <br/>
                        <label>
                            Lower Score:
                            <input
                                name = "lower"
                                type = "number"
                                value = {this.state.lower}
                                onChange = {this.handleInputChange}
                                min = "0"
                                max = "10"
                            /> 
                        </label>
                        <br/>
                        <label>
                            Common Studio Count:
                            <input
                                name = "commonStudioCount"
                                type = "number"
                                value = {this.state.commonStudioCount}
                                onChange = {this.handleInputChange}
                                min = "1"
                            /> 
                        </label>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>

                <div className = "output">
                    
                </div>
            </div>
        )
    }
}

export default commonStudios