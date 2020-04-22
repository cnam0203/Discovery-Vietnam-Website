import React, { Component } from 'react'
import '../containers/addrecipe.css'

export default class DirectionItem extends Component {
    constructor(props) {
        super(props)
        this.state ={
            idx: 0,
            img: this.props.img,
            title: this.props.title,
            content: this.props.content,
            kind: this.props.kind, 
        }
        this.addInputContent = this.addInputContent.bind(this)
        this.removeContent = this.removeContent.bind(this)
        this.addInputImg = this.addInputImg.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.updateContent = this.updateContent.bind(this)
        this.addImage = this.addImage.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.clickImage = this.clickImage.bind(this)
    }

    addInputContent() {
        this.setState({idx: 1})
    }

    addInputImg() {
        this.setState({idx: 1})
    }

    removeContent() {
        this.props.removeContent(this.props.index)
    }

    removeImage() {
        this.props.removeImg(this.props.index)
    }

    updateContent() {
        if (this.state.content != '') {
            this.props.updateContent(this.state.content, this.props.index)
            this.setState({idx: 0})
        } else{
            alert("Please add content")
        } 
    }

    addImage(e) {
        this.setState({img: e.target.files[0]})
    }

    updateImage() {
        if (this.state.img != null && this.state.title != '') {
            this.props.updateImage(this.state.img, this.state.title, this.props.index)
            this.setState({idx: 0})
        } else {
            alert("Please add image and comment for image")
        }
    }

    clickImage() {
        const inputId = '#img2' + this.props.index + this.props.time
        $(inputId).click();
    }


    render() {

        const { idx, img, title, content, kind } = this.state
        if (idx == 0) {
            if (kind == 0) {
                return (
                    <div className="input-content border-content">
                        <p className="content-add not-input">{content}</p>
                        <i className="fa fa-pencil edit" onClick={() => {this.addInputContent()}}></i>
                        <i className="fa fa-times delete" onClick={() => {this.removeContent()}}></i>
                    </div>
                )
            }
            else {
                return (
                    <div className="insert">
                        <div className="edit-img">
                            <i className="fa fa-pencil edit" onClick={() => {this.addInputImg()}}></i>
                            <i className="fa fa-times delete" onClick={() => {this.removeImage()}}></i>
                        </div>
                        {
                            img != null ? (
                                <img src={URL.createObjectURL(img)} className="input-image-img"></img>
                            ) : null
                        }
                        <div className="info-title">
                            {title}
                        </div>
                    </div>
                )
            }
        } else {
            if (kind == 0) {
                return (
                    <div className="input-content border-content">
                        <input type="text" value={content} className="content-add" onChange={(e) => this.setState({content: e.target.value})}></input>
                        <i className="fa fa-check check" onClick={() => {this.updateContent()}}></i>
                        <i className="fa fa-times remove" onClick={() => {this.removeContent()}}></i>
                    </div>
                )
            } else {
                const inputId = 'img2' + this.props.index + this.props.time
                return (
                    <div className="insert">
                        {
                            img != null ? (
                                <img src={URL.createObjectURL(img)} className="input-image-img"></img>
                            ) : null
                        }
                        <input type="file" name="file" id={inputId} onChange={(e) => this.addImage(e)} style={{display: 'none'}}></input>
                        <div className="input-content">
                            <input type="text" className="content-add dir-title" value={title} onChange={(e) => this.setState({title: e.target.value})}></input>
                            <i className="fa fa-upload edit" onClick={() => {this.clickImage()}}></i>
                            <i className="fa fa-check delete" onClick={() => {this.updateImage()}}></i>
                            <i className="fa fa-times edit" onClick={() => {this.removeImage()}}></i>
                        </div>
                    </div>
                )
            }
        }
    }
}