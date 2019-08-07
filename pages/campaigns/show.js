import React, { Component } from 'react';
import Layout from '../../components/Layout.js';
import Campaign from '../../ethereum/campaign.js';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3.js';
import ContributeForm from '../../components/ContributeForm.js';
import { Link } from '../../routes.js';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      address: props.query.address,
      minimumContribution : summary[0],
      balance : summary[1],
      requestsCount : summary[2],
      approversCount : summary[3],
      manager : summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      minimumContribution,
      requestsCount,
      approversCount,
      manager
    } = this.props;

    const items = [
      {
        header: manager,
        description: 'The manager created this campaign and can create requests to withdraw money',
        meta: 'Address of Manager',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        description: 'The balance is how much money this campaign has left to spend',
        meta: 'Campaign balance (ether)',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        description: 'You must contribute atleast this much wei to become an approver',
        meta: 'Minimum Contribution (wei)',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: requestsCount,
        description: 'A request tries to withdraw money from the contract. Requests must be approved by the approvers ',
        meta: 'Campaign requests',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: approversCount,
        description: 'Number of people who have already donated to the campaign',
        meta: 'Number of  Approvers',
        style: { overflowWrap: 'break-word'}
      }
    ];

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}  />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
               <a>
                 <Button primary>View Requests</Button>
               </a>
              </Link>
            </Grid.Column>  
          </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default CampaignShow;
