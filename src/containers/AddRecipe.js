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
            this.setState({editDisplay: true})
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
                    <input type="number" min="0" placeholder="amount" className="add-recipe-amount input" value={amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                    <input type="text" placeholder="unit" className="add-recipe-unit input" value={unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                    <input type="text" placeholder="name" className="add-recipe-ingre-name input" value={name} onChange={(e) => {this.setState({name: e.target.value})}}></input>
                    <i className="fa fa-check check" onClick={() => {this.edit()}}></i>
                    <i className="fa fa-times remove" onClick={() => {this.remove()}}></i>
                </div>
            )
            :
            (
                <div className="add-recipe-ingredient-item">
                    <div className="add-recipe-amount">{amount}</div>
                    <div className="add-recipe-unit">{unit}</div>
                    <div className="add-recipe-ingre-name">{name}</div>
                    <i className="fa fa-pencil edit" onClick={() => {this.editDisplay()}}></i>
                    <i className="fa fa-times delete" onClick={() => this.remove()}></i>
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
        this.props.removeIngrePart(index, partIndex)
    }

    addIngre() {
            this.setState({editIngre: true})
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
            this.setState({editDisplay: true});
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
                            <input type="text" placeholder="Part..." className="add-recipe-part-name" value={name} onChange={(e) => {this.setState({name: e.target.value})}}></input>
                            <i className="fa fa-check check" onClick={() => {this.edit()}}></i>
                            <i className="fa fa-times remove" onClick={() => {this.remove()}}></i>
                        </div>
                    ) : (
                        <div className="add-recipe-part-info">
                            <p className="add-recipe-part-name">{name}</p>
                            <i className="fa fa-pencil edit part" onClick={() => {this.editDisplay()}}></i>
                            <i className="fa fa-times delete part" onClick={() => {this.remove()}}></i>
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
                                key={item.id}  />
                        )
                    })
                }
                {
                    editIngre == false ? (
                        <div id="add-recipe-btn" onClick={() => this.addIngre()}>
                            ADD INGREDIENT
                        </div>
                    ) : (
                        <div className="add-recipe-ingredient-item new">
                            <input type="number" min="0" placeholder="Ex:1" className="add-recipe-amount input" value={this.state.amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                            <input type="text" placeholder="Ex:kg" className="add-recipe-unit input" value={this.state.unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                            <input type="text" placeholder="Ex: pork" className="add-recipe-ingre-name input" value={this.state.nameIngre} onChange={(e) => {this.setState({nameIngre: e.target.value})}}></input>
                            <i className="fa fa-check check" onClick={() => {this.addInput()}}></i>
                            <i className="fa fa-times remove" onClick={() => {this.removeInput()}}></i>
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
        const inputId = '#img' + this.props.index.toString()
        $(inputId).click();
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
        const inputId = 'img' + this.props.index.toString()
        if (idx == 0) {
            return (
                <div className="insert">
                    <p className="insert-title">Insert: </p>
                    <div className="add-recipe-direction">
                        <div className="dir-btn">
                            <div id="add-recipe-btn" onClick={() => this.setState({idx: 1})}>INSTRUCTION</div>
                        </div>
                        <div className="dir-btn">
                            <div id="add-recipe-btn" onClick={() => this.clickImage()}>IMAGE</div>
                        </div>
                        <input type="file" name="file" id={inputId} onChange={(e) => this.addImage(e)} style={{display: 'none'}}></input>
                    </div>
                </div>
            )
        } else if (idx == 1) {
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

class DirectionItem extends Component {
    constructor(props) {
        super(props)
        this.state ={
            idx: 0,
            img: this.props.img,
            title: this.props.title,
            content: this.props.content,
            kind: this.props.kind
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
        const inputId = '#img2' + this.props.index
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
                const inputId = 'img2' + this.props.index
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


export default class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            level: '',
            time: '',
            serves: '',
            img: null,
            addIngredient: false,
            ingredients: [],
            parts: [],
            partName: '',
            amount: '',
            ingreName: '',
            unit: '', 
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
        this.removeIngrePart = this.removeIngrePart.bind(this)
        this.editIngrePart = this.editIngrePart.bind(this)
        this.addIngrePart = this.addIngrePart.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.updateDirection = this.updateDirection.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.editDirection = this.editDirection.bind(this)
        this.editImage = this.editImage.bind(this)
        this.removeImg = this.removeImg.bind(this)
        this.removeContent = this.removeContent.bind(this)
    }

    uploadImage(e) {
        this.setState({img: e.target.files[0]})
    }

    updateImage(img, title, index) {
        const direction = {
            img: img,
            title: title,
            content: null,
            kind: 1,
            id: this.state.directions.length == 0 ? 0 : this.state.directions[this.state.directions.length - 1].id + 1
        }
        const newDirections  =this.state.directions
        newDirections.splice(index/2, 0, direction)
        this.setState({directions: newDirections})
    }

    updateDirection(content, index) {
        const direction = {
            ing: null,
            title: null,
            content: content,
            kind: 0,
            id: this.state.directions.length == 0 ? 0 : this.state.directions[this.state.directions.length - 1].id + 1
        }

        const newDirections  =this.state.directions
        newDirections.splice(index/2, 0, direction)
        this.setState({directions: newDirections})
    }

    editImage(img, title, index) {
        const newDirections = this.state.directions
        newDirections[(index-1)/2].img = img
        newDirections[(index-1)/2].title = title
        this.setState({directions: newDirections})
    }

    editDirection(content, index) {
        const newDirections = this.state.directions
        newDirections[(index-1)/2].content = content
        this.setState({directions: newDirections})
    }

    removeImg(index) {
        const newDirections = this.state.directions
        newDirections.splice((index-1)/2, 1)
        this.setState({directions: newDirections})
    }

    removeContent(index) {
        console.log(index)
        const newDirections = this.state.directions
        newDirections.splice((index-1)/2, 1)
        this.setState({directions: newDirections})
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
    }

    removePart(index) {
        this.setState({parts: this.state.parts.filter((_, i) => i !== index)})
    }

    removeIngrePart(index, partIndex) {
        const oldParts = this.state.parts
        var b = oldParts[partIndex].ingredients.splice(index, 1)
        this.setState({parts: oldParts})
    }

    editPart(index, name) {
        const updateParts = this.state.parts;
        updateParts[index].name = name;
        this.setState({parts: updateParts})
    }

    editIngrePart(index, recipe, partIndex) {
        const oldParts = this.state.parts
        oldParts[partIndex].ingredients[index] = recipe
        this.setState({parts: oldParts})
    }

    remove(index) {
        this.setState({ingredients: this.state.ingredients.filter((_, i) => i !== index)})
    }

    edit(index, recipe) {
        const updateRecipes = this.state.ingredients;
        updateRecipes[index] = recipe;
        this.setState({ingredients: updateRecipes})
    }

    removeInput() {
        this.setState({amount: ''})
        this.setState({ingreName: ''})
        this.setState({unit: ''})
        this.setState({editIngre: false})
    }

    removePartInput() {
        this.setState({partName: ''})
        this.setState({editPart: false})
    }

    addIngre() {
            this.setState({editIngre: true})
    }

    addPart() {
            this.setState({editPart: true})
    }

    addInput() {
        const recipe = {
            amount: this.state.amount,
            name: this.state.ingreName,
            unit: this.state.unit,
            id: this.state.ingredients.length == 0 ? 0 : this.state.ingredients[this.state.ingredients.length - 1].id + 2
        }
        const oldIngredients = this.state.ingredients;
        oldIngredients.push(recipe)
        this.setState({ingredients: oldIngredients})
        this.setState({amount: ''})
        this.setState({ingreName: ''})
        this.setState({unit: ''})
        this.setState({editIngre: false})
    }

    addPartInput() {
        const part = {
            name: this.state.partName,
            ingredients: [],
            id: this.state.parts.length == 0 ? 0 : this.state.parts[this.state.parts.length - 1].id + 2
        }
        const oldParts = this.state.parts;
        oldParts.push(part)
        this.setState({parts: oldParts})
        this.setState({partName: ''})
        this.setState({editPart: false})
    }

    render() {
        return (
            <div id="add-recipe-container">
                <div id="add-recipe-header">
                    <Logo />
                    <Navigator />
                    <SearchBar />
                    <p id="add-recipe-title">INNOVATE YUMMY RECIPES</p>
                    <i className="fa fa-upload"  id="add-recipe" style={{position: 'absolute', right: '5%', bottom: '5%'}}
                        onClick={() =>{alert("Your recipe uploaded successfully")}}><b id="add-recipe-text" style={{marginLeft: 5}}>Upload recipe</b></i>
                </div>
                <div id="add-recipe-content">
                    <div id="add-recipe-center">
                        <p>
                            <input type="text" value={this.state.name} placeholder="Recipe's name ..." onChange={(e) => {this.setState({name: e.target.value})}} id="add-recipe-name"></input>
                        </p>
                        {
                            this.state.img != null ? (
                                <img src={URL.createObjectURL(this.state.img)} className="input-image-img"></img>
                            ) : null
                        }
                        <div id="add-recipe-btn" onClick={() => {$("#upload-image").click();}}>
                        <i className="fa fa-upload upload" aria-hidden="true"></i>
                            UPLOAD IMAGE</div>
                        <input type="file" name="file" id="upload-image" onChange={(e) => this.uploadImage(e)} style={{display: 'none'}}></input>
                    </div>
                    <div id="add-recipe-left-col">
                        <div id="info-container">
                            <p className="direction-title">INFORMATION</p>
                            <div id="add-recipe-info">
                                <div className="add-recipe-time">
                                    TIME:
                                    <input type="text" value={this.state.time} placeholder="Ex: 30 mins" onChange={(e) => {this.setState({time: e.target.value})}} id="add-recipe-time-input"></input>
                                </div>
                                <div className="add-recipe-level">
                                    LEVEL:
                                    <input type="text" value={this.state.level} placeholder="Ex: Easy" onChange={(e) => {this.setState({level: e.target.value})}} id="add-recipe-level-input"></input>
                                </div>
                                <div className="add-recipe-serve">
                                    SERVES:
                                    <input type="number" step="1" min="1" value={this.state.serves} placeholder="Ex: 2" onChange={(e) => {this.setState({serves: e.target.value})}} id="add-recipe-serve-input"></input>
                                </div>
                            </div>
                        </div>
                        <div className="add-recipe-ingredients">
                            <p id="add-recipe-ingredients-title">INGREDIENTS</p>
                            <div style={{width:'100%'}} className="ingre-container">
                                {
                                    this.state.parts.map((item, index) => {
                                        return (
                                            <PartItem name={item.name} ingredients={item.ingredients} removePart={this.removePart} 
                                            addIngrePart={this.addIngrePart}
                                            editPart={this.editPart}
                                            removeIngrePart={this.removeIngrePart} 
                                            editIngrePart={this.editIngrePart} 
                                            idx={index} 
                                            key={item.id}  />
                                        )
                                    })
                                }
                                {
                                    this.state.editPart == true ? (
                                        <div style={{width: '100%', display: 'block'}}>
                                            <div className="new-title">New part: </div>
                                            <div id="add-recipe-part">
                                                <input placeholder="Part..." type="text" className="add-recipe-part-name input" value={this.state.partName} onChange={(e) => {this.setState({partName: e.target.value})}}></input>
                                                <i className="fa fa-check check" onClick={() => {this.addPartInput()}}></i>
                                                <i className="fa fa-times remove" onClick={() => {this.removePartInput()}}></i>
                                            </div> 
                                        </div>
                                    ) : (
                                        <div id="add-recipe-btn-big" onClick={() => {this.addPart()}}>
                                            ADD MAIN PART
                                        </div>
                                    )
                                }
                            </div>
                            <div style={{width:'100%'}} className="ingre-container">
                                    {
                                        this.state.ingredients.map((item, index) => {
                                            return (
                                                <IngredientItem recipe={item} kind={0} remove={this.remove} edit={this.edit} idx={index} key={item.id} /> 
                                            )
                                        })
                                    }
                                {
                                    this.state.editIngre == true ? (
                                        <div style={{width: '100%', display: 'block'}}>
                                            <div className="new-title">New ingredient: </div>
                                            <div className="add-recipe-ingredient-item new">
                                                <input type="number" min="0" placeholder="Ex:1" className="add-recipe-amount input" value={this.state.amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                                                <input type="text" placeholder="Ex:kg" className="add-recipe-unit input" value={this.state.unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                                                <input type="text" placeholder="Ex: pork" className="add-recipe-ingre-name input" value={this.state.ingreName} onChange={(e) => {this.setState({ingreName: e.target.value})}}></input>
                                                <i className="fa fa-check check" onClick={() => {this.addInput()}}></i>
                                                <i className="fa fa-times remove" onClick={() => {this.removeInput()}}></i>
                                            </div> 
                                        </div>
                                    ) : (
                                        <div id="add-recipe-btn-big" onClick={() => {this.addIngre()}}>
                                            ADD MAIN INGREDIENT
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div id="add-recipe-right-col">
                        <p className="direction-title">DIRECTIONS</p>
                        <DirectionInput updateImage={this.updateImage} updateDirection={this.updateDirection} index={0}/>
                        {
                            this.state.directions.map((item, index) => {
                                return (
                                <div key={item.id}>
                                    <DirectionItem img={item.img} 
                                                index={index*2+1}
                                                content={item.content} 
                                                title={item.title} 
                                                kind={item.kind} 
                                                updateImage={this.editImage}
                                                updateContent={this.editDirection}
                                                removeContent={this.removeContent}
                                                removeImg={this.removeImg} />
                                    <DirectionInput index={index*2+2}
                                                updateImage={this.updateImage}
                                                updateDirection={this.updateDirection} />
                                </div>
                            )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}