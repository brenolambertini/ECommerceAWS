#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ProductAppStack } from '../lib/productsApp-stack'
import { ECommerceApiStack } from '../lib/ecommerceApi-stack'

const app = new cdk.App()

const env: cdk.Environment = {
  account: '481665127899',
  region: 'us-east-1'
}

const tags = {
  cost: 'ECommerce',
  team: 'Breno'
}

const productsAppStack = new ProductAppStack(app, 'ProductsApp', {
  tags,
  env
})

const eCommerceApiStack = new ECommerceApiStack(app, 'ECommerceApi', {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags,
  env
})
eCommerceApiStack.addDependency(productsAppStack)
