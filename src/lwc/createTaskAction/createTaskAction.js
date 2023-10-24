/**
 * Created by annis on 23/10/2023.
 */

import {LightningElement} from 'lwc';
import {CloseActionScreenEvent} from "lightning/actions";

export default class CreateTaskAction extends LightningElement {
    isAction = true;

    handleSave() {
        this.refs.createToDo.handleParentClick();
    }

    closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent())
    }
}