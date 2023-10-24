/**
 * Created by Michael on 23/10/2023.
 */

import {LightningElement} from 'lwc';

export default class ToDoManager extends LightningElement {
    refreshToDo() {
        this.refs.pendingToDo.refreshList();
        this.refs.completedToDo.refreshList();
    }
}