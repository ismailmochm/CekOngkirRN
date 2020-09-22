import React, { Component } from 'react';
import { Text, View,StyleSheet,TextInput,ScrollView,} from 'react-native';
import {Body,Thumbnail, Right, Content, List, ListItem,Left,Button, Icon} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {LOGO} from '../config/Sourch'

export default class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: [],
        }
    }

    componentDidMount(){
        this.renderDataParams();
    }

    renderDataParams = () =>{
      let params = this.props.data
      const formData = new URLSearchParams();
      formData.append('origin', params.originCity);
      formData.append('destination', params.destinationCity);
      formData.append('weight', params.weight);
      formData.append('courier', params.courier)

      fetch('https://api.rajaongkir.com/starter/cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'key': '2c481eed8e3929ca6dbc35ca031910dc'
        },
        body: formData.toString()
      }).then((response) => response.json()
      ).then((responseData) => {
        let status = responseData['rajaongkir'] ['status'] ['code']
        if(status == 200){
          this.setState({
            results: responseData['rajaongkir'] ['results'][0] ['costs']
          })
        }
      })
    }

  
render() {
  let renderParamsItem = <View></View>
  if (this.state.results){
    renderParamsItem = this.state.results.map(item =>{
      return(
        <ListItem thumbnail key={new Date().getMilliseconds+Math.random()}>
            <Left>
                <Thumbnail source={{ uri: LOGO[this.props.data.courier] }}/>
            </Left>
            <Body>
                <Text>{item.service}</Text>
                <Text note>{item.description}</Text>
                <Text>{item.cost[0].etd}</Text>
            </Body>
            <Right>
            <Text>{item.cost[0].value}</Text>
            </Right>
        </ListItem>
      )
    })
  }

    return (
      <View style={styles.container}>
         <ScrollView>

          <View style={styles.header}>
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon name='chevron-small-left' type='Entypo'/>
              </Button>
            </Left>
            <Text style={{color:'white', textAlign:'center', fontSize: 20,}}>Detail harga</Text>
          </View>

          <View>
            <Content>
              <List>
                {renderParamsItem}
              </List>
            </Content>
          </View>

          </ScrollView> 
      </View>
    );
}
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: 'blue',
    height: 60,
  }
})