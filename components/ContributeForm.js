import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign.js';
import web3 from '../ethereum/web3.js';
import { Router } from '../routes.js';

class ContributeForm extends Component {

  state = {
    value: '',
    errMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errMessage: '' });

    try{

      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value ,'ether')
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch(err){
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
        <Form.Field>
          <label>Contribute to this Campaign!</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label='ether'
            labelPosition='right'
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errMessage} />
        <Button primary loading={this.state.loading}>Contribute!</Button>
      </Form>


    );

  }
}

export default ContributeForm;
