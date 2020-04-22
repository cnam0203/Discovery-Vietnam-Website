import React, { Component } from 'react'
import '../containers/addrecipe.css'
import IngredientItem from './IngredientItem'

export default class PartItem extends Component {
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
                            <input type="number" min="0" placeholder="Ex: 1" className="add-recipe-amount input" value={this.state.amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                            <input type="text" placeholder="Ex: kg" className="add-recipe-unit input" value={this.state.unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
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