import React from 'react';
import {graphql, Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import Ionicon from 'react-ionicons'
import {HeaderComponent} from "./HeaderComponent";
import NavigationBar from './NavigationBar';
import '../App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'

const DELETE_GFCLASS = gql`
    mutation deleteGroupFitClass($id: ID!){
        deleteGroupFitClass(id:$id){
            id
        }
    }
`

const GF_CLASS_LIST = gql`
    query{
        allGroupFitClasses(orderBy:title_ASC){
            id
            imageUrl
            title
            instructor{firstName, email, id}
            days{name}
            time
            startTime
            endTime
            createdAt
            isPublished
        }
        allDays{id,name},
        allInstructors{id, firstName, lastName email}
    }
`

const SINGLE_GF_CLASS = gql`
    query SingleGroupFitClass($id:ID!){
        GroupFitClass(id:$id){
            id
            title
            time
            startTime
            endTime
            sortTime
            instructor{firstName, lastName email, id}
            isPublished
            days{name}
        },
        allDays{id,name},
        allInstructors{id, firstName, lastName email}
    }
`

const GF_CLASS_ISPUBLISHED = gql`
    mutation updateIsPublished($id: ID!, $show: Boolean){
        updateGroupFitClass(id:$id, isPublished: $show){
            isPublished
        }
    }
`

const UPDATE_GFCLASS_STARTENDTIME = gql`
    mutation updateGroupFitClassStartEndTime($id: ID!, $startTime: DateTime, $endTime: DateTime) {
        updateGroupFitClass(id: $id, startTime: $startTime, endTime: $endTime) {
            id
            startTime
            endTime
        }
    }
`

const UPDATE_GFCLASS = gql`
    mutation updateGroupFitClassListing($id: ID!, $title: String, $time: String,  $idGFI: ID!, $daysArr: [ID!], $startTime: DateTime, $endTime: DateTime) {
        updateGroupFitClass(id: $id, title: $title, time: $time, daysIds: $daysArr, startTime: $startTime, endTime: $endTime) {
            id
            title
            time
            startTime
            endTime
            instructor {
                id
                firstName
            }
            days {
                id
                name
            }
        }
        addToInstructorsClasses(instructorInstructorId: $idGFI, classesGroupFitClassId: $id) {
            classesGroupFitClass {
                title
                days {
                    id
                    name
                }
                id
            }
            instructorInstructor {
                firstName
                id
            }
        }
    }
`

const CREATE_GFCLASS = gql`
    mutation CreateroupFitClass($id: ID!, $title: String, $time: String,  $idGFI: ID!, $daysArr: [ID!], $startTime: DateTime, $endTime: DateTime) {
        createGroupFitClass(id: $id, title: $title, time: $time, daysIds: $daysArr, startTime: $startTime, endTime: $endTime) {
            id
            title
            time
            startTime
            endTime
            instructor {
                id
                firstName
            }
            days {
                id
                name
            }
        }
        addToInstructorsClasses(instructorInstructorId: $idGFI, classesGroupFitClassId: $id) {
            classesGroupFitClass {
                title
                days {
                    id
                    name
                }
                id
            }
            instructorInstructor {
                firstName
                id
            }
        }
    }
`


const EditIsPublished = ({id, checked}) => {
    return(
        <Mutation mutation={GF_CLASS_ISPUBLISHED}>
            {(updateGroupFitClass, {data}) => (
                <form style={{flexDirection: "row"}}>
                        <label>Yes</label>
                        <input
                            style={{marginLeft: 5}}
                            type={"radio"}
                            name={"True"}
                            value={true}
                            checked={checked === true}
                            onChange={ e => {
                                if(window.confirm("Do you want to publish to mobile App?")){
                                    updateGroupFitClass({
                                        variables: {
                                            id,
                                            show: true
                                        },
                                        refetchQueries: [ { query: SINGLE_GF_CLASS, variables: {id} }],
                                    });
                                    console.log("GroupFitClass with id: " + id + " was updated to " + true);
                                }
                            }}
                        />
                        <label style={{marginLeft: 15}}>No</label>
                        <input
                            style={{marginLeft: 5}}
                            type={"radio"}
                            value={false}
                            checked={checked === false}
                            name={"False"}
                            onChange={ e => {
                                if(window.confirm("Do you want to remove from published?")){
                                    updateGroupFitClass({
                                        variables: {
                                            id,
                                            show: false
                                        },
                                        refetchQueries: [ { query: SINGLE_GF_CLASS, variables: {id} }],
                                    });
                                    console.log("GroupFitClass with id: " + id + " was updated to " + false);
                                }
                            }}
                        />
                </form>
            )}
        </Mutation>
    )
}

const RemoveGFClass = ({id}) => {
    return (
        <Mutation
            mutation={DELETE_GFCLASS}
        >
            {(deleteGroupFitClass, {data}) => (
                <Ionicon icon="ios-trash" onClick={ () => {
                    if(window.confirm("Are you really, really sure you want to DELETE? There's no take backs!")){
                        deleteGroupFitClass({
                            variables: {
                                id
                            }
                        });
                        console.log("GroupFitClass with id: " + id + " was deleted");
                    }
                }} fontSize="35px" color="black"/>
            )}
        </Mutation>
    );
};


class UpdateGroupFitClass extends React.Component{
    constructor(props){
        super(props);

        const startDate = new Date();
        const endDate = new Date();
        // startDate.setFullYear(startDate.getFullYear()  );
        startDate.setHours(0,0,0,0);
        //  endDate.setFullYear(endDate.getFullYear() + 1);
        endDate.setHours(0,0,0,0);

        this.state={
            title: undefined,
            displayTime: undefined,
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            instructor: '',
            dayCheckBox: false,
            modalIsOpen: false,
            isPublished: false,
            checkedDays:[],
            newInstructorSelection:'',
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this._handleClassScheduleCheck=this._handleClassScheduleCheck.bind(this);
        this._handleGroupFitClassUpdateSubmit=this._handleGroupFitClassUpdateSubmit.bind(this);
        this.handleNewInstructorSelection=this.handleNewInstructorSelection.bind(this);
        this._handleChangeEndDate = this._handleChangeEndDate.bind(this);
        this._handleChangeStartDate = this._handleChangeStartDate.bind(this);
        this._handleStartTime = this._handleStartTime.bind(this);
        this._handleEndTime = this._handleEndTime.bind(this);
        this._handleTitleValue = this._handleTitleValue.bind(this);
        this._handleStartEndTimeUpdate = this._handleStartEndTimeUpdate.bind(this);
        this._handleDaysUpdate = this._handleDaysUpdate.bind(this);
    }
    _handleChangeStartDate = (event, date) =>{
        let newDate = date;
        console.log("start newDate: " + newDate);
        this.setState({
            startDate: newDate
        });

    };
    _handleChangeEndDate = (event, date) =>{
        let newDate = date;
        console.log("end newDate: " + newDate);
        this.setState({
            endDate: newDate,
        });
    };
    _handleStartTime = (event, time) => {
        this.setState({startTime: time});
    }
    _handleEndTime = (event, time) => {
        this.setState({endTime: time});
    }
    _handleTitleValue(e, valueData){
        this.setState({title: valueData})
    }
    _handleClassScheduleCheck(e){
        let newSelection = e.target.value;
        let newCheckedDayList;

        if(this.state.checkedDays.indexOf(newSelection) > -1){
            newCheckedDayList = this.state.checkedDays.filter(s => s !== newSelection)
        } else {
            newCheckedDayList = [...this.state.checkedDays, newSelection];
        }
        this.setState({checkedDays: newCheckedDayList}, () => console.log('day selection', this.state.checkedDays));
        console.log(this.state.checkedDays)
    }
    handleNewInstructorSelection(e) {
        this.setState({ newInstructorSelection: e.target.value }, () => console.log('new instructor', this.state.newInstructorSelection));
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    componentWillMount() {
        Modal.setAppElement('body');
    }
    _handleStartEndTimeUpdate = async (id) => {
        let classStartTime = moment(this.state.startTime);
        let classStartDate = moment(this.state.startDate);
        let renderStartDateTime = moment({
            year: classStartDate.year(),
            month: classStartDate.month(),
            day: classStartDate.date(),
            hour: classStartTime.hours(),
            minute: classStartTime.minutes(),
            second: 0,
        });
        let classEndTime = moment(this.state.endTime);
        let classEndDate = moment(this.state.endDate);
        let renderEndDateTime = moment({
            year: classEndDate.year(),
            month: classEndDate.month(),
            day: classEndDate.date(),
            hour: classEndTime.hours(),
            minute: classEndTime.minutes(),
            second: 0,
        });

        if(renderStartDateTime !== null && renderEndDateTime !== null){
            let start = moment(renderStartDateTime).toISOString();
            let end = moment(renderEndDateTime).toISOString();

            await this.props.mutate({
                variables:{
                    id:id,
                    idGFI: this.state.newInstructorSelection,
                    startTime: start,
                    endTime: end,
                },
                refetchQueries:[
                    {query: GF_CLASS_LIST}
                ]
            })

        }
    };
    _handleDaysUpdate = async (id) => {
        await this.props.mutate({
            variables:{
                id:id,
                idGFI: this.state.newInstructorSelection,
                daysArr: this.state.checkedDays
            },
            refetchQueries:[
                {query: GF_CLASS_LIST}
            ]
        })

    };
    _handleGroupFitClassUpdateSubmit = async (id) => {
        try{
            await this.props.mutate({
                variables:{
                    id: id,
                    idGFI: this.state.newInstructorSelection,
                    title: this.state.title,
                    time: this.state.displayTime,
                },
                refetchQueries:[
                    {query: GF_CLASS_LIST}
                ]
            })

        } catch (e) {
            console.log(e.message)
        }
    };

    render(){
        return(
            <div>
                <div className={"justify-center alignItems-center"}>
                    <Ionicon icon="md-build" onClick={() => this.openModal()} fontSize="35px" color="gray"/>
                </div>
                <div>
                    <Query query={SINGLE_GF_CLASS} variables={{id: this.props.id}}>
                        {({loading, error, data}) => {
                            if (loading) return "Loading...";
                            if (error) return `Errro! ${error.message}`;
                            const daysArr = data.allDays;
                            const instructorArr = data.allInstructors;
                            return (
                                <div>
                                    <div style={{ justifyContent:'center', textAlign:'center', alignContent:'center'}}>
                                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                                            <div className={"pull-right"}>
                                                <Ionicon
                                                    icon="ios-close-circle-outline"
                                                    onClick={this.closeModal}
                                                    fontSize="45px"
                                                    color="blue"
                                                />
                                            </div>
                                            <form
                                                style={{textAlign: 'center', marginTop: 70}}
                                                onSubmit={ async(e) => {
                                                    e.preventDefault();
                                                    await this._handleGroupFitClassUpdateSubmit(data.GroupFitClass.id);
                                                    this.closeModal();
                                                }}
                                            >
                                                <div style={{justifyContent:'center', textAlign:'center', alignContent:'center', }}>
                                                    <div style={{display: 'flex' ,flex: 1, textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>
                                                        <div style={{position: 'center', display: "flex", flexDirection: "row", marginRight: 30, textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>
                                                            <label  style={{marginRight: 15, }}>Class Title:</label>
                                                                <br/>
                                                                <input
                                                                    style={{width: 240, textAlign: 'center'}}
                                                                    name={'title'}
                                                                    value={this.state.title}
                                                                    placeholder={data.GroupFitClass.title}
                                                                    onChange={ (e) => this.setState({title: e.target.value})}
                                                                />
                                                        </div>
                                                        <br/>
                                                        <div style={{display: "flex", flexDirection: "row", textAlign:'center', justifyContent:'center', flexAlign: 'center', alignContent:'center', alignItems: 'center'}}>
                                                            <label  style={{marginRight: 15, }}>Display Time:</label>
                                                            <br/>
                                                            <input
                                                                style={{width: 240, textAlign: 'center'}}
                                                                value ={this.state.displayTime}
                                                                placeholder = {data.GroupFitClass.time}
                                                                onChange = {(e) => this.setState({displayTime: e.target.value})}
                                                            />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div  style={{marginTop: 20, padding: 20}}>
                                                        <label >Current Instructor:</label>
                                                        <label style={{marginLeft: 10, padding: 5,
                                                            fontSize: 14, width: 100, color:"#acacac", fontWeight:"normal"}}>
                                                            {data.GroupFitClass.instructor.firstName}
                                                        </label>
                                                        <label style={{marginLeft:20}}>Select Instructor:</label>
                                                        <select
                                                            name={"Instructors"}
                                                            value={this.state.newInstructorSelection}
                                                            onChange={this.handleNewInstructorSelection}
                                                            defaultChecked={data.GroupFitClass.instructor.id}
                                                            className="form-select"
                                                            style={{marginLeft: 15}}
                                                        >
                                                            <option value={data.GroupFitClass.instructor.id}>{'Current: ' + data.GroupFitClass.instructor.lastName + ', ' + data.GroupFitClass.instructor.firstName}</option>
                                                            {instructorArr.map(opt => {
                                                                return (
                                                                    <option key={opt.id} value={opt.id}>
                                                                        {opt.lastName}, {opt.firstName}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div style={{border: '1px dotted black', padding: 30}}>
                                                        <div style={{ marginTop: 30,  justifyContent:'center', textAlign:'center', alignContent:'center', alignItems:'center'}}>
                                                            <label>Current Schedule Days:</label>
                                                            {data.GroupFitClass.days.map(({name}, index) =>
                                                                <label key={index} style={{marginLeft: 10,  padding: 5,
                                                                    fontSize: 14, width: 100, color:"#acacac", fontWeight:"normal"}}>{name}</label>
                                                            )}
                                                        </div>
                                                        <label className='w-40 pa3 mv2' style={{marginTop: 40}}>Select New Schedule Days:</label>
                                                        <br />
                                                        {daysArr.map((obj, index) =>
                                                            <div style={{display:"inline", }} key={index}>
                                                                <label style={{marginLeft: 20, fontWeight:"normal"}}>{obj.name}</label>
                                                                <input
                                                                    style={{marginLeft: 10}}
                                                                    type={"checkbox"}
                                                                    value={obj.id}
                                                                    checked={this.state.checkedDays.indexOf(obj.id) > -1}
                                                                    onChange={this._handleClassScheduleCheck }
                                                                />
                                                            </div>
                                                        )}
                                                        <div style={{marginTop: 40}}>
                                                            <button
                                                                className={"btn btn-primary"}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    this._handleDaysUpdate(data.GroupFitClass.id);
                                                                }}>Update Days</button>
                                                        </div>

                                                    </div>
                                                    <br />
                                                    <div style={{display: 'center', border: "1px dotted black",  alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding: 30}}>
                                                        <label className='w-40 pa3 mv2'>Publish Date & Time:</label>

                                                            <MuiThemeProvider>
                                                                <div>
                                                                    <div style={{ textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>
                                                                        <p style={{color: '#acacac', fontSize: 12}}>Current Start DateTime:  {moment(data.GroupFitClass.startTime).format('M/D/Y')} at {moment(data.GroupFitClass.startTime).format('h:mm a')}</p>
                                                                        <p style={{color: '#acacac', fontSize: 12}}>Current End DateTime:  {moment(data.GroupFitClass.endTime).format('M/D/Y')} at {moment(data.GroupFitClass.endTime).format('h:mm a')}</p>
                                                                    </div>
                                                                    <div style={{display: 'flex' ,flex: 1, textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>

                                                                        <div style={{display: 'flex', flexDirection: "column"}}>
                                                                        <DatePicker
                                                                            onChange={this._handleChangeStartDate}
                                                                            floatingLabelText={"Start Date"}
                                                                            value={this.state.startDate}
                                                                            className={"col s4 indigo lighten-1 grey-text text-lighten-5"}
                                                                        />
                                                                        <DatePicker
                                                                            onChange={this._handleChangeEndDate}
                                                                            floatingLabelText="End Date"
                                                                            value={this.state.endDate}
                                                                            className={"col s6 light-blue lighten-1 grey-text text-lighten-5"}
                                                                        />
                                                                        </div>
                                                                        <div style={{display: 'flex',  flexDirection: "column", alignItems: 'center', marginLeft: 70}}>
                                                                            <TimePicker
                                                                                style={{fontWeight:"bold", marginTop: 25, fontSize:12, display:'inline'}}
                                                                                hintText={'Start Time'}
                                                                                minutesStep={5}
                                                                                value={this.state.startTime}
                                                                                onChange={this._handleStartTime}
                                                                            />
                                                                            <TimePicker
                                                                                style={{fontWeight:"bold", marginTop: 25, fontSize:12, display:'inline'}}
                                                                                hintText={'End Time'}
                                                                                minutesStep={5}
                                                                                value={this.state.endTime}
                                                                                onChange={this._handleEndTime}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{marginTop: 40}}>
                                                                        <button
                                                                            className={"btn btn-primary"}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                this._handleStartEndTimeUpdate(data.GroupFitClass.id);
                                                                            }}>Update DateTimes</button>
                                                                    </div>
                                                                </div>
                                                            </MuiThemeProvider>
                                                    </div>
                                                    <br />

                                                    <br/>

                                                </div>
                                                <button
                                                     title={"Submit"}
                                                     type={"submit"}
                                                     className={"btn btn-danger btn-lg active"}
                                                     style={{marginTop: 10, boxShadow: 3}}
                                                >Submit
                                                </button>
                                            </form>

                                        </Modal>
                                    </div>
                                </div>
                            );
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}

const UpdateTheGFClass = graphql(UPDATE_GFCLASS, {options: { fetchPolicy: 'network-only' }})(UpdateGroupFitClass);




class CreateGroupFitClass extends React.Component{
    constructor(props){
        super(props);

        this.state={
            title: undefined,
            displayTime: undefined,
            classId: undefined,
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            instructor: '',
            dayCheckBox: false,
            modalIsOpen: false,
            isPublished: false,
            checkedDays:[],
            newInstructorSelection:'',
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this._handleClassScheduleCheck=this._handleClassScheduleCheck.bind(this);
        this._handleGroupFitClassUpdateSubmit=this._handleGroupFitClassUpdateSubmit.bind(this);
        this.handleNewInstructorSelection=this.handleNewInstructorSelection.bind(this);
        this._handleChangeEndDate = this._handleChangeEndDate.bind(this);
        this._handleChangeStartDate = this._handleChangeStartDate.bind(this);
        this._handleStartTime = this._handleStartTime.bind(this);
        this._handleEndTime = this._handleEndTime.bind(this);
        this._handleTitleValue = this._handleTitleValue.bind(this);
        this._handleStartEndTimeUpdate = this._handleStartEndTimeUpdate.bind(this);
        this._handleDaysUpdate = this._handleDaysUpdate.bind(this);
    }
    _handleChangeStartDate = (event, date) =>{
        let newDate = date;
        console.log("start newDate: " + newDate);
        this.setState({
            startDate: newDate
        });

    };
    _handleChangeEndDate = (event, date) =>{
        let newDate = date;
        console.log("end newDate: " + newDate);
        this.setState({
            endDate: newDate,
        });
    };
    _handleStartTime = (event, time) => {
        this.setState({startTime: time});
    }
    _handleEndTime = (event, time) => {
        this.setState({endTime: time});
    }
    _handleTitleValue(e, valueData){
        this.setState({title: valueData})
    }
    _handleClassScheduleCheck(e){
        let newSelection = e.target.value;
        let newCheckedDayList;

        if(this.state.checkedDays.indexOf(newSelection) > -1){
            newCheckedDayList = this.state.checkedDays.filter(s => s !== newSelection)
        } else {
            newCheckedDayList = [...this.state.checkedDays, newSelection];
        }
        this.setState({checkedDays: newCheckedDayList}, () => console.log('day selection', this.state.checkedDays));
        console.log(this.state.checkedDays)
    }
    handleNewInstructorSelection(e) {
        this.setState({ newInstructorSelection: e.target.value }, () => console.log('new instructor', this.state.newInstructorSelection));
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    componentWillMount() {
        Modal.setAppElement('body');
    }
    _handleStartEndTimeUpdate = async () => {
        let classStartTime = moment(this.state.startTime);
        let classStartDate = moment(this.state.startDate);
        let renderStartDateTime = moment({
            year: classStartDate.year(),
            month: classStartDate.month(),
            day: classStartDate.date(),
            hour: classStartTime.hours(),
            minute: classStartTime.minutes(),
            second: 0,
        });
        let classEndTime = moment(this.state.endTime);
        let classEndDate = moment(this.state.endDate);
        let renderEndDateTime = moment({
            year: classEndDate.year(),
            month: classEndDate.month(),
            day: classEndDate.date(),
            hour: classEndTime.hours(),
            minute: classEndTime.minutes(),
            second: 0,
        });

        if(renderStartDateTime !== null && renderEndDateTime !== null){
            let start = moment(renderStartDateTime).toISOString();
            let end = moment(renderEndDateTime).toISOString();

            await this.props.mutate({
                variables:{
                    idGFI: this.state.newInstructorSelection,
                    startTime: start,
                    endTime: end,
                },
                refetchQueries:[
                    {query: GF_CLASS_LIST}
                ]
            })

        }
    };
    _handleDaysUpdate = async () => {
        await this.props.mutate({
            variables:{
                idGFI: this.state.newInstructorSelection,
                daysArr: this.state.checkedDays
            },
            refetchQueries:[
                {query: GF_CLASS_LIST}
            ]
        })

    };
    _handleGroupFitClassUpdateSubmit = async () => {
        try{
            await this.props.mutate({
                variables:{
                    idGFI: this.state.newInstructorSelection,
                    title: this.state.title,
                    time: this.state.displayTime,
                },
                refetchQueries:[
                    {query: GF_CLASS_LIST}
                ]
            })

        } catch (e) {
            console.log(e.message)
        }
    };

    render(){

        return(
            <div>
                <div style={{marginRight: 70, justifyContent: 'flex-end', display: 'flex', flexDirection: "row"}}>
                    <p style={{textAlign:'right', fontSize: 10, justifyContent:"center", marginTop: 15}}>Create Class:</p>
                    <Ionicon icon="md-add-circle" onClick={() => this.openModal()} fontSize="70px" color="green" style={{float: 'right'}}/>
                </div>

                <div style={{ justifyContent:'center', textAlign:'center', alignContent:'center'}}>
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                        <div className={"pull-right"}>
                            <Ionicon
                                icon="ios-close-circle-outline"
                                onClick={this.closeModal}
                                fontSize="45px"
                                color="blue"
                            />
                        </div>
                        <form
                            style={{textAlign: 'center', marginTop: 70}}
                            onSubmit={ async(e) => {
                                e.preventDefault();
                                await this._handleGroupFitClassUpdateSubmit;
                                this.closeModal();
                            }}
                        >
                            <div style={{justifyContent:'center', textAlign:'center', alignContent:'center', }}>
                                <div style={{display: 'flex' ,flex: 1, textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>
                                    <div style={{position: 'center', display: "flex", flexDirection: "row", marginRight: 30, textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>
                                        <label  style={{marginRight: 15, }}>Class Title:</label>
                                        <br/>
                                        <input
                                            style={{width: 240, textAlign: 'center'}}
                                            name={'title'}
                                            value={this.state.title}
                                            placeholder={"title"}
                                            onChange={ (e) => this.setState({title: e.target.value})}
                                        />
                                    </div>
                                    <br/>
                                    <div style={{display: "flex", flexDirection: "row", marginRight: 30, textAlign:'center', justifyContent:'center', flexAlign: 'center', alignContent:'center', alignItems: 'center'}}>
                                        <label  style={{marginRight: 15, }}>Display Time:</label>
                                        <br/>
                                        <input
                                            style={{width: 240, textAlign: 'center'}}
                                            value ={this.state.displayTime}
                                            placeholder = {"time"}
                                            onChange = {(e) => this.setState({displayTime: e.target.value})}
                                        />
                                    </div>
                                    <div style={{display: "flex", flexDirection: "row", textAlign:'center', justifyContent:'center', flexAlign: 'center', alignContent:'center', alignItems: 'center'}}>
                                        <label  style={{marginRight: 15, }}>Class ID:</label>
                                        <br/>
                                        <input
                                            style={{width: 240, textAlign: 'center'}}
                                            value ={this.state.classId}
                                            placeholder = {"trxFall2018"}
                                            onChange = {(e) => this.setState({classId: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div  style={{marginTop: 20, padding: 20}}>
                                    <label style={{marginLeft:20}}>Select Instructor:</label>
                                    <select
                                        name={"Instructors"}
                                        value={this.state.newInstructorSelection}
                                        onChange={this.handleNewInstructorSelection}
                                        className="form-select"
                                        style={{marginLeft: 15}}
                                    >
                                        {this.props.instructorList.map(opt => {
                                            return (
                                                <option key={opt.id} value={opt.id}>
                                                    {opt.lastName}, {opt.firstName}
                                                </option>
                                            );
                                        })}

                                    </select>
                                </div>
                                <div style={{border: '1px dotted black', padding: 30}}>

                                    <label className='w-40 pa3 mv2' style={{marginTop: 40}}>Select Schedule Days:</label>
                                    <br />
                                    {this.props.days.map((obj, index) =>
                                        <div style={{display:"inline", }} key={index}>
                                            <label style={{marginLeft: 20, fontWeight:"normal"}}>{obj.name}</label>
                                            <input
                                                style={{marginLeft: 10}}
                                                type={"checkbox"}
                                                value={obj.id}
                                                checked={this.state.checkedDays.indexOf(obj.id) > -1}
                                                onChange={this._handleClassScheduleCheck }
                                            />
                                        </div>
                                    )}

                                    <div style={{marginTop: 40}}>
                                        <button
                                            className={"btn btn-primary"}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this._handleDaysUpdate;
                                            }}>Update Days</button>
                                    </div>

                                </div>
                                <br />
                                <div style={{display: 'center', border: "1px dotted black",  alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding: 30}}>
                                    <label className='w-40 pa3 mv2'>Publish Date & Time:</label>

                                    <MuiThemeProvider>
                                        <div>
                                            <div style={{ textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>
                                                <p style={{color: '#acacac', fontSize: 12}}>Start DateTime:  {moment(this.state.startDate).format('M/D/Y')} at {moment(this.state.startTime).format('h:mm a')}</p>
                                                <p style={{color: '#acacac', fontSize: 12}}>End DateTime:  {moment(this.state.endTime).format('M/D/Y')} at {moment(this.state.endTime).format('h:mm a')}</p>
                                            </div>
                                            <div style={{display: 'flex' ,flex: 1, textAlign:'center', justifyContent:'center', flexAlign: 'center', alignItems: 'center'}}>

                                                <div style={{display: 'flex', flexDirection: "column"}}>
                                                    <DatePicker
                                                        onChange={this._handleChangeStartDate}
                                                        floatingLabelText={"Start Date"}
                                                        value={this.state.startDate}
                                                        className={"col s4 indigo lighten-1 grey-text text-lighten-5"}
                                                    />
                                                    <DatePicker
                                                        onChange={this._handleChangeEndDate}
                                                        floatingLabelText="End Date"
                                                        value={this.state.endDate}
                                                        className={"col s6 light-blue lighten-1 grey-text text-lighten-5"}
                                                    />
                                                </div>
                                                <div style={{display: 'flex',  flexDirection: "column", alignItems: 'center', marginLeft: 70}}>
                                                    <TimePicker
                                                        style={{fontWeight:"bold", marginTop: 25, fontSize:12, display:'inline'}}
                                                        hintText={'Start Time'}
                                                        minutesStep={5}
                                                        value={this.state.startTime}
                                                        onChange={this._handleStartTime}
                                                    />
                                                    <TimePicker
                                                        style={{fontWeight:"bold", marginTop: 25, fontSize:12, display:'inline'}}
                                                        hintText={'End Time'}
                                                        minutesStep={5}
                                                        value={this.state.endTime}
                                                        onChange={this._handleEndTime}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{marginTop: 40}}>
                                                <button
                                                    className={"btn btn-primary"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this._handleStartEndTimeUpdate;
                                                    }}>Create DateTimes</button>
                                            </div>
                                        </div>
                                    </MuiThemeProvider>
                                </div>
                                <br />

                                <br/>

                            </div>
                            <button
                                title={"Submit"}
                                type={"submit"}
                                className={"btn btn-danger btn-lg active"}
                                style={{marginTop: 10, boxShadow: 3}}
                            >Submit
                            </button>
                        </form>

                    </Modal>
                </div>
            </div>

        );
    }
}

const CreateTheGFClass = graphql(CREATE_GFCLASS, {options: { fetchPolicy: 'network-only' }})(CreateGroupFitClass);


class GroupFitClassList extends React.Component{
    constructor() {
        super();
        this.state = {
            isPublished: null,
        };
        this.changePublishedStatus = this.changePublishedStatus.bind(this);
    }
    changePublishedStatus(){
        this.setState({isPublished: !this.state.isPublished});
    }
    render(){
        return(
            <Query query={GF_CLASS_LIST}>
                {({loading, error, data}) => {
                    if(loading) return "Loading...";
                    if(error) return `Errro! ${error.message}`;

                    return(
                        <div>
                            <HeaderComponent/>
                            <NavigationBar/>
                            <div >
                                <CreateGroupFitClass instructorList={data.allInstructors} days={data.allDays}/>
                                <table style={{margin: 10, padding: 20, border:'1px solid black',}}>
                                    <tbody>
                                    <tr style={{textAlign: 'center'}} >
                                        <th className={"th"}>Image:</th>
                                        <th className={"th"}>Title:</th>
                                        <th className={"th"}>Display Time:</th>
                                        <th className={"th"}>Days:</th>
                                        <th className={"th"}>Instructor:</th>
                                        <th className={"th"}>Published?</th>
                                        <th className={"th"}>Start DateTime:</th>
                                        <th className={"th"}>End DateTime:</th>
                                    </tr>
                                    {data.allGroupFitClasses.map(({title, time, id, days, instructor, isPublished, imageUrl, startTime, endTime}) => (
                                            <tr key={id}>
                                                <td style={{ border:'2px solid black',  width: 200, textAlign: 'center' }}><img style={{height: 100, width: 160}} src={imageUrl} alt={title} /></td>
                                                <td style={{ border:'2px solid black',  width: 300, textAlign: 'center'}}>{title}</td>
                                                <td style={{ border:'1px solid black',  width: 200, textAlign: 'center'}}>{time}</td>
                                                <td style={{ border:'1px solid black',  width:  300, textAlign: 'center'}}>{days.map(({name}) => name).join(", ")}</td>
                                                 <td className={"td"}>{instructor.firstName}</td>
                                                <td style={{ border:'1px solid black',  width: 100, textAlign: 'center' }}>
                                                   <EditIsPublished id={id} checked={isPublished}/>
                                                </td>
                                                <td style={{ border:'1px solid black',  width: 100,textAlign: 'center' }}>{moment(startTime).format('h:mm a') + "\n \n" + moment(startTime).format("M/D/Y")}</td>
                                                <td style={{ border:'1px solid black',  width: 100,textAlign: 'center' }}>{moment(endTime).format('h:mm a') + "\n \n" + moment(endTime).format("M/D/Y")}</td>
                                                <td style={{ border:'1px solid black',  width: 100, textAlign: 'center'}}>
                                                    <RemoveGFClass id={id}/>
                                                </td>
                                                <td style={{ border:'1px solid black',  width: 100, textAlign: 'center' }}>
                                                    <UpdateTheGFClass id={id}/>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}
export default GroupFitClassList;


/*
<label key={id}>
    <input
        type={"text"}
        placeholder={isPublished.toString()}
        onChange={this.changePublishedStatus}
        value={this.state.isPublished}
    />
    <EditIsPublished id={id} publishStatus={this.state.isPublished}/>
</label>
*/
 /* <div>
    <h1>SortTime: </h1>
    <p>{data.GroupFitClass.sortTime}</p>
    <p>{moment(data.GroupFitClass.sortTime).format('h:mm a')}</p>
    <p>StartDate: {moment(this.state.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
    <p>StartDate: {moment(this.state.startDate).toISOString()}</p>
    <p>StartDate: {moment(this.state.startDate).format()}</p>
    <p>Enddate: {moment(this.state.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
    <p>StartTime: {moment(this.state.startTime).format("h:mm:ss a")}</p>
    <p>EndTime: {moment(this.state.endTime).format("h:mm:ss a")}</p>
    <p>StartTime Data: {data.GroupFitClass.startTime}</p>
    <p>EndTime Data: {moment(data.GroupFitClass.endTime).format("h:mm:ss")}</p>
    <p>{this.state.checkedDays.map((obj) => obj).join(', ')}</p>

</div>*/

