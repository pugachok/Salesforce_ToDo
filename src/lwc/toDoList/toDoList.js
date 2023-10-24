/**
 * Created by Michael Pugach on 23/10/2023.
 */

import {api, LightningElement, wire} from 'lwc';
import getToDoList from "@salesforce/apex/ToDoController.getToDoList";
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import {refreshApex} from "@salesforce/apex";
import updateToDo from "@salesforce/apex/ToDoController.updateToDo";

export default class ToDoList extends LightningElement {
    toDoList;
    @api taskStatus;

    get pageTitle() {
        return this.taskStatus + ' Tasks';
    }

    get showButton() {
        return this.taskStatus === 'Pending';
    }

    handleUpdateStatus(event) {
        updateToDo({toDoId: event.target.dataset.recordid})
            .then(result => {
                if (result === 'Success') {
                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Success',
                        message: 'Task Completed Successfully!',
                        variant: 'success'
                    }));
                    this.dispatchEvent(new CustomEvent('refreshtodo'));
                }
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                }));
            });
    }

    @wire(getToDoList, {taskStatus: "$taskStatus"})
    wireToDoList(result) {
        this.wireToDoListResult = result;
        if(result.data) {
            this.toDoList = result.data;
        } else if (result.error) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: result.error.body.message,
                variant: 'error'
            }));
        }
    }

    @api
    refreshList() {
        refreshApex(this.wireToDoListResult);
    }
}