import React, { Component } from 'react';

export default class Todo extends Component {

  state = {
    task: {
      title: "",
      taskStatus: false
    },
    activeTab: 1,
    value: [],
    changeId: -1,
    hideCreate: false
  }

  addTask = (e) => {
    var task = {
      title: e.target.value,
      taskStatus: false
    }
    this.setState({task: task})
  }


  // create task on Create button
  createTask = () => {
    if (this.state.task.title != "") {
      var temp = this.state.value;
      temp.unshift(this.state.task);
      this.setState({
        value: temp,
        task: {
          title: ""
        }
      })
    }
  }


  // show warning if task title is empty
  warningMsg() {
    return <div
      class={this.state.task.title == ""
      ? "invalid-feedback d-block"
      : "invalid-feedback"}>
      Title can't be empty
    </div>
  }


  // change status of task {completed or pending}
  changeStatus = (index) => {
    var temp = this.state.value;
    temp[index].taskStatus = !temp[index].taskStatus;
    this.setState({value: temp})
  }



  // remove task from list
  removeTask = (index) => {
    var temp = this.state.value;
    temp.splice(index, 1);
    this.setState({value: temp})
  }


  // change task title
  changeTaskTitle = (data, index) => {

    this.setState({
      task: {
        title: data.title
      },
      hideCreate: !this.state.hideCreate,
      changeId: index
    })
  }


  // save changes 
  saveChanges = () => {
    var temp = this.state.value;
    temp[this.state.changeId].title = this.state.task.title;
    this.setState({
      value: temp,
      task: {
        title: ""
      },
      hideCreate: !this.state.hideCreate
    })
  }

  render() {
    

    return <React.Fragment>
      <div
        class="img-fluid d-flex align-items-center"
        style={{
        backgroundImage: "url('https://narod.hr/wp-content/uploads/2019/08/GettyImages-639446454.jpg')",
        height: "100vh",
        backgroundPosition: "center"
      }}>
        <div className="container">
          <div className="row">

            <div class="col-6 m-auto">

              <div className="card">
                <div className="card-header">
                  Todo
                </div>
                <div className="card-body">
                  <h5 className="card-title">Create Tasks</h5>
                  <div className="input-group mb-3 col-8 mx-auto">

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Task Title"
                      onChange={e => this.addTask(e)}
                      value={this.state.task.title}/>
                    <div className="input-group-append">
                      {!this.state.hideCreate && <button
                        className="btn btn-primary"
                        type="button"
                        onClick={e => this.createTask()}>Create</button>}
                      {this.state.hideCreate && <button
                        className="btn btn-success"
                        type="button"
                        onClick={e => this.saveChanges()}>Save Changes</button>}
                    </div>
                  </div>
                  {this.warningMsg()}
                </div>

                <ul className="nav nav-pills nav-fill col-10 m-auto">
                  <li className="nav-item" onClick={e => this.setState({activeTab: 1})}>
                    <a
                      className={this.state.activeTab == 1
                      ? "nav-link active"
                      : "nav-link"}>All Tasks</a>
                  </li>
                  <li className="nav-item" onClick={e => this.setState({activeTab: 2})}>
                    <a
                      className={this.state.activeTab == 2
                      ? "nav-link active"
                      : "nav-link"}>Pending Tasks</a>
                  </li>
                  <li className="nav-item" onClick={e => this.setState({activeTab: 3})}>
                    <a
                      className={this.state.activeTab == 3
                      ? "nav-link active"
                      : "nav-link"}>Completed Tasks</a>
                  </li>
                </ul>

                <ul
                  className="list-group col-10 mx-auto my-5"
                  style={this.state.value.length > 4
                  ? {
                    "max-height": "300px",
                    "overflow-y": "scroll"
                  }
                  : {
                    "min-height": "300px"
                  }}>
                  {this.state.activeTab == 1 && this
                    .state
                    .value
                    .map((item, index) => {
                      return <li
                        key={index}
                        className={item.taskStatus
                        ? "list-group-item d-flex justify-content-between align-items-center list-group-ite" +
                          "m-success my-1"
                        : "list-group-item d-flex justify-content-between align-items-center list-group-ite" +
                          "m-danger my-1"}>
                       
                          <input
                          className="col-1"
                            type="checkbox"
                            onChange={e => this.changeStatus(index)}
                            contentEditable="true"
                            checked={!item.taskStatus
                            ? false
                            : true}/> <label  className="col-7 text-left text-capitalize">{item.title}</label>
                            <div  className="col-4 d-flex justify-content-end align-items-center">
                        {!this.state.hideCreate &&<span className="badge badge-info m-auto" onClick={e => this.changeTaskTitle(item, index)}>Edit</span>}
                        {!this.state.hideCreate &&<span className="badge badge-pill badge-danger" onClick={e => this.removeTask(index)}>X</span>}
                        </div>
                      </li>
                    })}

                  {this.state.activeTab != 1 && this
                    .state
                    .value
                    .map((item, index) => {
                      return (this.state.activeTab == 2 ? !item.taskStatus : item.taskStatus) && <li
                      key={index}
                      className={item.taskStatus
                      ? "list-group-item d-flex justify-content-between align-items-center list-group-ite" +
                        "m-success my-1"
                      : "list-group-item d-flex justify-content-between align-items-center list-group-ite" +
                        "m-danger my-1"}>
                     
                        <input
                        className="col-1"
                          type="checkbox"
                          onChange={e => this.changeStatus(index)}
                          contentEditable="true"
                          checked={!item.taskStatus
                          ? false
                          : true}/> <label  className="col-7 text-left text-capitalize">{item.title}</label>
                          <div  className="col-4 d-flex justify-content-end align-items-center">
                      {!this.state.hideCreate &&<span className="badge badge-info m-auto" onClick={e => this.changeTaskTitle(item, index)}>Edit</span>}
                      {!this.state.hideCreate && <span className="badge badge-pill badge-danger" onClick={e => this.removeTask(index)}>X</span>}
                      </div>
                    </li>
                    })}
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}