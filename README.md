# API Example Developer Guide

This document describes how to utilize the API Example repo.

## Requirements

* Permission from CardCash to access its API.
* Node JS >= 6.9.1
* A network connection
* Environment Variables:
  1. CardCash Sandbox API URI
  2. CardCash generated app name

Note: Developers must copy .env_example to .env and prefill said environment variables.


## What does this repo do?

This API Example repo is designed to show a CardCash Partner how utilize CardCashs API in the most basic way.

### Supported Examples
#### API Authorization: `` $ node API_Authorization/index.js ``
#### Sell Side
- Get_Merchants: ``$ node Sell\ Side/Get_Merchants/index.js ``
- Create_Cart: ``$ node Sell\ Side/Create_Cart/index.js   ``
- Add_Card_To_Card: ``$ node Sell\ Side/Add_Card_To_Card/index.js ``
- Update_Card_In_Cart: ``$ node Sell\ Side/Update_Card_In_Cart/index.js   ``


#### Buy Side
- Create_Cart: ``$ node Buy\ Side/Create_Cart/index.js   ``
- Add_Inventory_Card_To_Cart: `` $ node Buy\ Side/Add_Inventory_Card_To_Cart/index.js `` 