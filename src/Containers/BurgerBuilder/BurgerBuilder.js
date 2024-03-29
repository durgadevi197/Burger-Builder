import React , {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
//import BuildControl from '../../Components/Burger/BuildControls/BuildControl/BuildControl';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
     salad : 0.1,
     cheese : 0.1,
     meat : 0.5,
     bacon : 0.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad :0,
            cheese :0,
            meat :0,
            bacon :0
        },
        
        totalPrice :5,
        purchasable : false,
        purchasing : false
    }

 addIngredientHandler = (type) => {
     const oldCount = this.state.ingredients[type];
     const updatedCount = oldCount + 1 ;
     const updatedIngredients = {
         ...this.state.ingredients
     };
     updatedIngredients[type] = updatedCount;
     const priceAddition = INGREDIENT_PRICES[type];
     const oldPrice = this.state.totalPrice;
     const newPrice = priceAddition+oldPrice;
     this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
     this.updatePurchaseState(updatedIngredients);

 } 
 
 removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
        return 
    }
     const updatedCount = oldCount - 1 ;
     const updatedIngredients = {
         ...this.state.ingredients
     };
     updatedIngredients[type] = updatedCount;
     const priceDeduction = INGREDIENT_PRICES[type];
     const oldPrice = this.state.totalPrice;
     const newPrice = oldPrice - priceDeduction;
     this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
     this.updatePurchaseState(updatedIngredients);
 }

    updatePurchaseState(ingredients) {
             const sum = Object.keys(ingredients)
             .map(igKey => {
                 return ingredients[igKey];
             })
             .reduce((sum,el) => {
                 return sum+el;
             },0);
            this.setState({purchasable: sum > 0});

    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
            {/* <div>Burger</div> */}
            <Modal show={this.state.purchasing}>
                <OrderSummary ingredients = {this.state.ingredients}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            {/* <div>Burger Controls</div> */}
            <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled ={disabledInfo}
                purchasable={this.state.purchasable}
                ordered = {this.purchaseHandler}
                price = {this.state.totalPrice}

            />

            </Aux>
        );
    }
}

export default BurgerBuilder;