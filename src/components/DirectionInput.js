import React, { Component } from 'react'
import '../containers/addrecipe.css'

export default class DirectionInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: null,
            content: '',
            title: '',
            idx: 0, 
        }
        this.updateContent = this.updateContent.bind(this)
        this.removeContent = this.removeContent.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.addImage = this.addImage.bind(this)
        this.clickImage = this.clickImage.bind(this)
    }

    clickImage() {
        const inputId = '#img' + this.props.index.toString() + this.props.time
        $(inputId).click();
    }

    addImage(e) {
        console.log(e.target.files[0])
        if (e.target.files[0] != 'undefined') {
            this.setState({img: e.target.files[0]})
            this.setState({idx: 3})
        }
    }

    updateImage() {
        const { img, title } = this.state
        if (img != null && title != '') {
            this.setState({img: ''})
            this.setState({title: ''})
            this.setState({idx: 0})
            this.props.updateImage(img, title, this.props.index)
        } else {
            alert("Please add image and comment for image")
        }
        
    }

    removeImage() {
        this.setState({img: ''})
        this.setState({title: ''})
        this.setState({idx: 0})
    }

    updateContent() {
        const { content } = this.state;
        if (content == '')
            alert("Please add content")
        else {
            this.props.updateDirection(content, this.props.index)
            this.setState({content: ''})
            this.setState({idx: 0})
        }
    }

    removeContent() {
        this.setState({content: ''})
        this.setState({idx: 0})
    }

   
    render() {
        const { idx, content , img, title} = this.state
        const inputId = 'img' + this.props.index.toString() + this.props.time
        if (idx == 0) {
            return (
                <div style={{width: '100%', margin: '10px 0', textAlign: 'center'}}>
                    <i className="fa fa-plus check" aria-hidden="true" onClick={() => {this.setState({idx: 1})}}></i>
                </div>
            )
        }
        else if (idx == 1) {
            return (
                <div className="insert">
                    <i className="fa fa-times check" onClick={() => {this.removeContent()}}></i>
                    <div className="add-recipe-direction">
                        <div className="dir-btn">
                            <div id="add-recipe-btn" onClick={() => this.setState({idx: 2})}>INSTRUCTION</div>
                        </div>
                        <div className="dir-btn">
                            <div id="add-recipe-btn" onClick={() => this.clickImage()}>IMAGE</div>
                        </div>
                        <input type="file" name="file" id={inputId} onChange={(e) => this.addImage(e)} style={{display: 'none'}}></input>
                    </div>
                </div>
            )
        } else if (idx == 2) {
            return (
                <div className="insert">
                    <div className="input-content">
                        <input type="text" className="content-add" value={content} onChange={(e) => this.setState({content: e.target.value})} placeholder="Add new step ..."></input>
                        <i className="fa fa-check check" onClick={() => {this.updateContent()}}></i>
                        <i className="fa fa-times remove" onClick={() => {this.removeContent()}}></i>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="insert">
                    <div className="input-image">
                        {
                            this.state.img != null ? (
                                <img src={URL.createObjectURL(this.state.img)} className="input-image-img"></img>
                            ) : null
                        }
                        <input type="file" name="file" id={inputId} onChange={(e) => this.addImage(e)} style={{display: 'none'}}></input>
                        <div className="input-content">
                            <input type="text" className="content-add dir-title" value={title} onChange={(e) => this.setState({title: e.target.value})} placeholder="Comment your image..."></input>
                            <i className="fa fa-upload edit" onClick={() => {this.clickImage()}}></i>
                            <i className="fa fa-check delete" onClick={() => {this.updateImage()}}></i>
                            <i className="fa fa-times edit" onClick={() => {this.removeImage()}}></i>
                        </div>
                    </div>
                </div>
            )
        }
    }


}