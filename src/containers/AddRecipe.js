import React, { Component } from 'react'
import './addrecipe.css'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'


class IngredientItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editDisplay: false,
            amount: this.props.recipe.amount,
            unit: this.props.recipe.unit,
            name: this.props.recipe.name
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.editDisplay = this.editDisplay.bind(this)
    }

    edit() {
        this.setState({editDisplay : false})
        if (this.props.kind == 0)
            this.props.edit(this.props.idx, {
                amount: this.state.amount,
                unit: this.state.unit,
                name: this.state.name
            })
        else {
            this.props.edit(this.props.idx, {
                amount: this.state.amount,
                unit: this.state.unit,
                name: this.state.name
            }, this.props.partIdx)
        }

    }

    editDisplay() {
        if (this.props.editKey == false) {
            this.setState({editDisplay: true})
            this.props.editIngre()
        } else {
            alert("Please add/edit")
        }
    }

    remove() {
        this.setState({editDisplay : false})
        if (this.props.kind == 0) {
            this.props.remove(this.props.idx)
        }
        else {
            this.props.remove(this.props.idx, this.props.partIdx)
        }
    }

    render() {

        const { amount, unit, name } = this.state

        return this.state.editDisplay == true ?
            (
                <div className="add-recipe-ingredient-item">
                    <input type="text" className="add-recipe-input-amount" value={amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                    <input type="text" className="add-recipe-input-unit" value={unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                    <input type="text" className="add-recipe-input-name" value={name} onChange={(e) => {this.setState({name: e.target.value})}}></input>
                    <i className="fa fa-check" onClick={() => {this.edit()}}></i>
                    <i className="fa fa-times" onClick={() => {this.remove()}}></i>
                </div>
            )
            :
            (
                <div className="add-recipe-ingredient-item">
                    <div className="add-recipe-amount">{amount}</div>
                    <div className="add-recipe-unit">{unit}</div>
                    <div className="add-recipe-ingre-name">{name}</div>
                    <i className="fa fa-pencil" onClick={() => {this.editDisplay()}}></i>
                    <i className="fa fa-times" onClick={() => this.remove()}></i>
                </div>
            )
    }
}

class PartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            ingredients: this.props.ingredients,
            editDisplay: false,
            editIngre: false,
            nameIngre: '',
            amount: '',
            unit: ''
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.editDisplay = this.editDisplay.bind(this)
        this.addIngre = this.addIngre.bind(this)
        this.addInput = this.addInput.bind(this)
        this.removeInput = this.removeInput.bind(this)
        this.removeIngre = this.removeIngre.bind(this)
    }

    removeIngre(index, partIndex) {
        alert('1234')
        this.props.removeIngrePart(index, partIndex)
    }

    addIngre() {
        if (this.props.editKey == false) {
            this.setState({editIngre: true})
            this.props.editIngre()
        } else {
            alert("Please add/edit")
        }
    }

    addInput() {
        this.setState({nameIngre: ''})
        this.setState({unit: ''})
        this.setState({amount: ''})
        this.setState({editIngre: false})
        this.props.addIngrePart(this.props.idx, {
            name: this.state.nameIngre,
            unit: this.state.unit,
            amount: this.state.amount,
        })
    }

    removeInput() {
        this.setState({nameIngre: ''})
        this.setState({unit: ''})
        this.setState({amount: ''})
        this.setState({editIngre: false})
    }



    editDisplay() {
        if (this.props.editKey == false) {
            this.setState({editDisplay: true});
            this.props.editIngre()
        } else {
            alert("Please add/edit")
        }
    }

    edit() {
        this.setState({editDisplay: false})
        this.props.editPart(this.props.idx, this.state.name)
    }

    remove() {
        this.setState({editDisplay: false})
        this.props.removePart(this.props.idx)
    }

    render() {
        const { name, ingredients, editDisplay, editIngre } = this.state

        return (
            <div className="add-recipe-part">
                {
                    editDisplay == true ? (
                        <div className="add-recipe-part-info">
                            <input type="text" className="add-recipe-input-name-part" value={name} onChange={(e) => {this.setState({name: e.target.value})}}></input>
                            <i className="fa fa-check" onClick={() => {this.edit()}}></i>
                            <i className="fa fa-times" onClick={() => {this.remove()}}></i>
                        </div>
                    ) : (
                        <div className="add-recipe-part-info">
                            <p className="add-recipe-part-name">{name}</p>
                            <i className="fa fa-pencil" onClick={() => {this.editDisplay()}}></i>
                            <i className="fa fa-times" onClick={() => {this.remove()}}></i>
                        </div>
                    )
                }
                
                {
                    ingredients.map((item, index) => {
                        return (
                            <IngredientItem recipe={item} 
                                kind={1}
                                remove={this.props.removeIngrePart} 
                                edit={this.props.editIngrePart} 
                                idx={index} 
                                partIdx={this.props.idx}
                                key={item.id} 
                                editKey={this.props.editKey} 
                                editIngre={this.props.editIngre} />
                        )
                    })
                }
                {
                    editIngre == false ? (
                        <div className="add-recipe-add-ingredient" onClick={() => this.addIngre()}>
                            ADD ingredient
                        </div>
                    ) : (
                        <div id="add-recipe-input-ingredient">
                            <input type="text" className="add-recipe-input-amount" value={this.state.amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                            <input type="text" className="add-recipe-input-unit" value={this.state.unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                            <input type="text" className="add-recipe-input-name" value={this.state.nameIngre} onChange={(e) => {this.setState({nameIngre: e.target.value})}}></input>
                            <i className="fa fa-check" onClick={() => {this.addInput()}}></i>
                            <i className="fa fa-times" onClick={() => {this.removeInput()}}></i>
                        </div> 
                    )
                }
            </div>
        )
    }
}

class DirectionInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: null,
            content: '',
            title: '',
            idx: 0
        }
        this.updateContent = this.updateContent.bind(this)
        this.removeContent = this.removeContent.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.addImage = this.addImage.bind(this)
        this.clickImage = this.clickImage.bind(this)
    }

    clickImage() {
        $("#profile-img").click();
    }

    addImage(e) {
        console.log(e.target.files[0])
        if (e.target.files[0] != 'undefined') {
            this.setState({img: e.target.files[0]})
            this.setState({idx: 2})
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
            alert("Please add image")
        }
        
    }

    removeImage() {
        this.setState({img: ''})
        this.setState({title: ''})
        this.setState({idx: 0})
    }

    updateContent() {
        const { content } = this.state;
        if (content == null)
            alert("Please input content")
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
        if (idx == 0) {
            return (
                <div className="add-recipe-direction">
                    <div className="add-recipe-content" onClick={() => this.setState({idx: 1})}>Add content</div>
                    <div className="add-recipe-image" onClick={() => this.clickImage()}>Add image</div>
                    <input type="file" name="file" id="profile-img" onChange={(e) => this.addImage(e)} style={{display: 'none'}}></input>
                </div>
            )
        } else if (idx == 1) {
            return (
                <div className="input-content">
                    <input type="text" classname="input-content-txt" value={content} onChange={(e) => this.setState({content: e.target.value})}></input>
                    <i className="fa fa-check" onClick={() => {this.updateContent()}}></i>
                    <i className="fa fa-times" onClick={() => {this.removeContent()}}></i>
                </div>
            )
        } else {
            return (
                <div className="input-image">
                    {
                        this.state.img != null ? (
                            <img src={URL.createObjectURL(this.state.img)} className="input-image-img"></img>
                        ) : null
                    }
                    <input type="file" name="file" id="profile-img" onChange={(e) => this.addImage(e)} style={{display: 'none'}}></input>
                    <input type="text" className="input-title" value={title} onChange={(e) => this.setState({title: e.target.value})}></input>
                    <i className="fa fa-pencil" onClick={() => {this.clickImage()}}></i>
                    <i className="fa fa-check" onClick={() => {this.updateImage()}}></i>
                    <i className="fa fa-times" onClick={() => {this.removeImage()}}></i>
                </div>
            )
        }
    }


}


export default class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            level: '',
            time: '',
            serves: '',
            addIngredient: false,
            ingredients: [],
            parts: [],
            partName: '',
            amount: '',
            ingreName: '',
            unit: '', 
            edit: false,
            editIngre: false,
            editPart: false,
            directions: []
        }
        this.remove = this.remove.bind(this)
        this.edit = this.edit.bind(this)
        this.removePart = this.removePart.bind(this)
        this.editPart = this.editPart.bind(this)
        this.removeInput = this.removeInput.bind(this)
        this.addInput = this.addInput.bind(this)
        this.addIngre = this.addIngre.bind(this)
        this.removePartInput = this.removePartInput.bind(this)
        this.addPartInput = this.addPartInput.bind(this)
        this.addPart = this.addPart.bind(this)
        this.editIngre = this.editIngre.bind(this)
        this.removeIngrePart = this.removeIngrePart.bind(this)
        this.editIngrePart = this.editIngrePart.bind(this)
        this.addIngrePart = this.addIngrePart.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.updateDirection = this.updateDirection.bind(this)
    }

    updateImage(img, title, index) {
        console.log('sucess')
    }

    updateDirection(content, index) {
        console.log('sucess')
    }

    addIngrePart(index, recipe) {
        const oldParts = this.state.parts
        oldParts[index].ingredients.push({
            name: recipe.name,
            amount: recipe.amount,
            unit: recipe.unit,
            id: oldParts[index].ingredients.length == 0 ? 0 : oldParts[index].ingredients[oldParts[index].ingredients.length-1].id + 1
        })
        this.setState({parts: oldParts})
        this.setState({edit: false})
    }

    removePart(index) {
        this.setState({parts: this.state.parts.filter((_, i) => i !== index)})
        this.setState({edit: false})
    }

    removeIngrePart(index, partIndex) {
        const oldParts = this.state.parts
        var b = oldParts[partIndex].ingredients.splice(index, 1)
        this.setState({parts: oldParts})
        this.setState({edit: false})
    }

    editPart(index, name) {
        const updateParts = this.state.parts;
        updateParts[index].name = name;
        this.setState({parts: updateParts})
        this.setState({edit: false})
    }

    editIngrePart(index, recipe, partIndex) {
        const oldParts = this.state.parts
        oldParts[partIndex].ingredients[index] = recipe
        this.setState({parts: oldParts})
        this.setState({edit: false})
    }

    remove(index) {
        this.setState({ingredients: this.state.ingredients.filter((_, i) => i !== index)})
        this.setState({edit: false})
    }

    edit(index, recipe) {
        const updateRecipes = this.state.ingredients;
        updateRecipes[index] = recipe;
        this.setState({ingredients: updateRecipes})
        this.setState({edit: false})
    }

    editIngre() {
        this.setState({edit: true})
    }

    removeInput() {
        this.setState({amount: ''})
        this.setState({ingreName: ''})
        this.setState({unit: ''})
        this.setState({editIngre: false})
        this.setState({edit: false})
    }

    removePartInput() {
        this.setState({partName: ''})
        this.setState({editPart: false})
        this.setState({edit: false})
    }

    addIngre() {
        if (this.state.edit == false) {
            this.setState({edit: true})
            this.setState({editIngre: true})
        }
        else
            alert("Please edit before add new ingredients")
    }

    addPart() {
        if (this.state.edit == false) {
            this.setState({edit: true})
            this.setState({editPart: true})
        }
        else
            alert("Please edit before add new ingredients")
    }

    addInput() {
        const recipe = {
            amount: this.state.amount,
            name: this.state.ingreName,
            unit: this.state.unit,
            id: this.state.ingredients.length == 0 ? 0 : this.state.ingredients[this.state.ingredients.length - 1].id + 1
        }
        const oldIngredients = this.state.ingredients;
        oldIngredients.push(recipe)
        this.setState({ingredients: oldIngredients})
        this.setState({amount: ''})
        this.setState({ingreName: ''})
        this.setState({unit: ''})
        this.setState({editIngre: false})
        this.setState({edit: false})
    }

    addPartInput() {
        const part = {
            name: this.state.partName,
            ingredients: [],
            id: this.state.parts.length == 0 ? 0 : this.state.parts[this.state.parts.length - 1].id + 1
        }
        const oldParts = this.state.parts;
        oldParts.push(part)
        this.setState({parts: oldParts})
        this.setState({partName: ''})
        this.setState({editPart: false})
        this.setState({edit: false})
    }

    render() {
        return (
            <div id="add-recipe-container">
                <div id="add-recipe-header">
                    <Logo />
                    <Navigator />
                    <SearchBar />
                </div>
                <div id="add-recipe-content">
                    <p id="add-recipe-title">INNOVATE YUMMY RECIPES</p>
                    <div id="add-recipe-info">
                        <p>
                            Name:
                            <input type="text" value={this.state.name} placeholder="Name" onChange={(e) => {this.setState({name: e.target.value})}} id="add-recipe-name"></input>
                        </p>
                        <p>
                            Time:
                            <input type="text" value={this.state.time} placeholder="Time" onChange={(e) => {this.setState({time: e.target.value})}} id="add-recipe-time"></input>
                        </p>
                        <p>
                            Level:
                            <input type="text" value={this.state.level} placeholder="Level" onChange={(e) => {this.setState({level: e.target.value})}} id="add-recipe-level"></input>
                        </p>
                        <p>
                            Serves:
                            <input type="text" value={this.state.serves} placeholder="Serves" onChange={(e) => {this.setState({serves: e.target.value})}} id="add-recipe-serves"></input>
                        </p>
                    </div>
                    <div id="add-recipe-left-col">
                        <p id="add-recipe-ingredients-title">INGREDIENTS</p>
                        {
                            this.state.ingredients.map((item, index) => {
                                return (
                                    <IngredientItem recipe={item} kind={0} remove={this.remove} edit={this.edit} idx={index} key={item.id} editKey={this.state.edit} editIngre={this.editIngre} /> 
                                )
                            })
                        }
                        {
                            this.state.parts.map((item, index) => {
                                return (
                                    <PartItem name={item.name} ingredients={item.ingredients} removePart={this.removePart} 
                                    addIngrePart={this.addIngrePart}
                                    editPart={this.editPart}
                                    removeIngrePart={this.removeIngrePart} 
                                    editIngrePart={this.editIngrePart} 
                                    idx={index} 
                                    key={item.id} 
                                    editKey={this.state.edit} 
                                    editIngre={this.editIngre} />
                                )
                            })
                        }
                        {
                            this.state.editIngre == true ? (
                                <div id="add-recipe-input-ingredient">
                                    <input type="text" className="add-recipe-input-amount" value={this.state.amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                                    <input type="text" className="add-recipe-input-unit" value={this.state.unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                                    <input type="text" className="add-recipe-input-name" value={this.state.ingreName} onChange={(e) => {this.setState({ingreName: e.target.value})}}></input>
                                    <i className="fa fa-check" onClick={() => {this.addInput()}}></i>
                                    <i className="fa fa-times" onClick={() => {this.removeInput()}}></i>
                                </div> 
                            ) : (
                                <div id="add-recipe-addIngre-btn" onClick={() => {this.addIngre()}}>
                                    Add ingredient
                                </div>
                            )
                        }
                        {
                            this.state.editPart == true ? (
                                <div id="add-recipe-input-part">
                                    <input type="text" className="add-recipe-input-part-name" value={this.state.partName} onChange={(e) => {this.setState({partName: e.target.value})}}></input>
                                    <i className="fa fa-check" onClick={() => {this.addPartInput()}}></i>
                                    <i className="fa fa-times" onClick={() => {this.removePartInput()}}></i>
                                </div> 
                            ) : (
                                <div id="add-recipe-addPart-btn" onClick={() => {this.addPart()}}>
                                    Add Part
                                </div>
                            )
                        }
                    </div>
                    <div id="add-recipe-right-col">
                        <DirectionInput updateImage={this.updateImage} updateDirection={this.updateDirection} index={0}/>
                    </div>
                </div>
            </div>
        )
    }
}