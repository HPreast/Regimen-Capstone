import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getWeekdays, getWorkoutById } from "../../modules/workoutManager";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addWorkoutDay, getWorkoutDaysByWorkoutId, deleteWorkoutDay, editWorkoutDay } from "../../modules/workoutDayManager";
import { WorkoutdayCard } from "./workoutDayCard";

export const WorkoutDetails = () => {
    const [workout, setWorkout] = useState({});
    const [weekdays, setWeekdays] = useState([]);
    const [workoutDay, setWorkoutDay] = useState({
        workoutId: 0,
        name: "",
        dayId: 0,
        dayName: ""
    });
    const [workoutDays, setWorkoutDays] = useState([]);
    const [saveState, setSaveState] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toggle, setToggle] = useState({
        workoutDay: false
    })
    const [dropDown, setDropDown] = useState();

    const { id } = useParams();

    const displayDetails = () => {
        getWorkoutById(id)
            .then(res => setWorkout(res))
    }

    const toggleModal = () => setModal(!modal);

    const fetchDays = () => {
        return getWeekdays()
            .then(res => setWeekdays(res))
    }

    const fetchWorkoutDays = () => {
        return getWorkoutDaysByWorkoutId(id)
            .then(res => setWorkoutDays(res))
    }

    const handleDropdown = (event) => {
        let newDay = { ...workoutDay };
        newDay.dayName = event.target.innerHTML
        newDay.dayId = parseInt(event.target.id);
        setWorkoutDay(newDay)
    }

    const handleInputChange = (event) => {
        let newDay = { ...workoutDay };
        newDay.name = event.target.value;
        setWorkoutDay(newDay);
    }

    const handleSave = () => {
        let newDay = { ...workoutDay }
        newDay.workoutId = workout.id
        addWorkoutDay(newDay)
            .then(() => setSaveState(!saveState))
    }

    const handleDelete = (id) => {
        let yes = window.confirm("Are you sure you want to delete this day?")
        if (yes === true) {
            deleteWorkoutDay(id)
                .then(() => fetchWorkoutDays())
        }
    }

    useEffect(() => {
        displayDetails();
        fetchWorkoutDays();
    }, [saveState])

    return (
        <>
            <h2>{workout.name}</h2>
            <Button className="button" onClick={() => {
                toggleModal();
                fetchDays();
            }} disabled={isLoading}>Add New Day</Button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>New Workout Day</ModalHeader>
                <ModalBody>
                    <Input type="text" placeholder="Name..." onChange={handleInputChange}></Input>
                    <Dropdown isOpen={toggle.workoutDay} toggle={() => setToggle({ workoutDay: !toggle.workoutDay })}>
                        <DropdownToggle caret>
                            {workoutDay.dayName ? workoutDay.dayName : <>Weekday</>}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose a Day</DropdownItem>
                            {weekdays.map(day => {
                                return <DropdownItem id={day.id} key={day.id} onClick={handleDropdown}>{day.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => {
                        handleSave()
                        toggleModal()
                    }} disabled={isLoading}>Save New Day</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div>
                {workoutDays?.map(day => {
                    return <WorkoutdayCard key={day.id} day={day} id={id} handleDelete={handleDelete} saveState={saveState} setSaveState={setSaveState} />
                })}
            </div>
        </>
    )
}