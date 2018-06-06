import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { EntryItemDescription } from 'component/EntryList';
import { Entry } from 'store/Entry';
import InputInteger from 'component/InputInteger';
import Form from '../Form';

@observer
export default class EntryTicket extends Component {
    static propTypes = {
        entry: PropTypes.instanceOf(Entry).isRequired,
        allowEdit: PropTypes.bool,
    };

    @observable editing = false;

    handleBlur = () => {
        this.editing = false;
        this.props.entry.save();
    };

    handleClick = () => {
        if (this.props.allowEdit) {
            this.editing = true;
        }
    };

    handleChange = (name, value) => {
        this.props.entry.ticket = value;
    };

    render() {
        const { entry, allowEdit } = this.props;
        if (this.editing) {
            return (
                <EntryItemDescription>
                    <Form onSubmit={this.handleBlur}>
                        <InputInteger
                            onChange={this.handleChange}
                            name="ticket"
                            value={entry.ticket + ''}
                            onBlur={this.handleBlur}
                            autoFocus
                            small
                        />
                    </Form>
                </EntryItemDescription>
            );
        }
        const showTicket = entry.ticket;
        return (
            <EntryItemDescription
                onClick={this.handleClick}
                allowEdit={allowEdit}
            >
                {showTicket ? 'T' + entry.ticket : <i>No ticket</i>}
            </EntryItemDescription>
        );
    }
}
