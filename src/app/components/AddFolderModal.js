import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter} from 'react-modal-bootstrap';

export default class AddFolderModal extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        toggleModal: PropTypes.func,
        addFolderHandler: PropTypes.func
    }

    constructor() {
        super()

        this.state = {
            folderName: '',
            formError: false
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.hideModal}>
                <form onSubmit={this.submitForm}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideModal}/>
                        <ModalTitle>Новая папка</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className={'form-group' + (this.state.formError ? ' has-error' : '')}>
                            <input type="text" className="form-control" ref="folderName" value={this.state.folderName} onChange={this.folderNameChange} placeholder="Название папки" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-default' onClick={this.hideModal}>Отмена</button>
                        <button className='btn btn-success' type="submit">Создать</button>
                    </ModalFooter>
                </form>
            </Modal>
        )
    }

    hideModal = () => {
        this.setState({
            folderName: '',
            formError: false,
        })
        this.props.toggleModal(false)
    };

    folderNameChange = (event) => {
        const folderName = event.target.value
        let formError = true
        if (folderName) {
            formError = false
        }
        this.setState({
            folderName: folderName,
            formError: formError
        })
    }

    submitForm = (event) => {
        event.preventDefault()
        let folderName = this.state.folderName

        if (folderName) {
            this.props.addFolderHandler(folderName)
            this.setState({
                folderName: '',
                formError: false,
            })
        } else {
            this.setState({
                formError: true,
            })
        }

    }

}