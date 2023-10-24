/**
 * Created by Michael on 23/10/2023.
 */

import {LightningElement, api} from 'lwc';
import saveToDo from "@salesforce/apex/ToDoController.saveToDo";
import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class CreateTask extends LightningElement {
    @api targetParent;
    taskTitle;
    dueDate;
    showDueDate = false;
    showSave = false;

    handleOnChange(event) {
        const filedName = event.target.name;
        if (filedName === 'taskTitle') {
            this.taskTitle = event.target.value;
            this.taskTitle !== '' ? this.showDueDate = true : this.showDueDate = false;
        } else if (filedName === 'dueDate') {
            this.dueDate = event.target.value;
            this.dueDate !== '' && this.targetParent !== true ? this.showSave = true : this.showSave = false;
        }
    }

    handleSave() {
        saveToDo({title: this.taskTitle, dueDate: this.dueDate})
            .then(result => {
                if (result === 'Success') {
                    this.taskTitle = '';
                    this.dueDate = '';

                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Success',
                        message: 'A new item has been added in your ToDo list',
                        variant: 'success'
                    }));
                    this.dispatchEvent(new CustomEvent('refreshtodo'));
                    if (this.targetParent === true) {
                        this.dispatchEvent(new CustomEvent('closeaction', {
                                detail: result
                        }));
                    }
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

    @api
    handleParentClick() {
        this.handleSave();
    }
}