import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../../../service/api/axios";
import TableViewCustom from "../../../component/list/TableViewCustom.jsx";
import HomeLayout from "../../../layout/HomeLayout.jsx";
import DialogAddProduct from "../../../component/dialog/DialogAddProduct";
import { useNavigate } from "react-router-dom";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      meta: {},
      count: 0,
      order: "asc",
      orderBy: "id",
      limit: 5,
      page: 1,
      openAddProduct: false,
    };
  }

  header = [
    {
      image: {
        server: {
          base_url: import.meta.env.VITE_API_URL + "product/photo/",
          path: "id",
        },
        alt_text: "name",
      },
    },
    {
      name: "ID",
      text: { value: "id", align: "left" },
      align: "left",
      sort: "id",
    },
    {
      name: "Name",
      text: { value: "name", align: "left" },
      align: "left",
      sort: "name",
    },
    {
      name: "Code Product",
      text: { value: "code_product", align: "left" },
      align: "left",
      sort: "code_product",
    },
    {
      name: "Action",
      actions: [
        {
          type: Button,
          onAction: this.changeToSkuPage,
          label: "Sku",
        },

        {
          type: Button,
          onAction: this.changeToPhotoProduct,
          label: "Photo"
        }
      ],
      align: "center",
    },
  ];
  // useEffect() {
  //   this.getProduct();
  // }
  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    api
      .get("/product", {
        params: {
          limit: this.state.limit,
          page: this.state.page,
          order_by: this.state.orderBy,
          order: this.state.order,
        },
      })
      .then((res) => {
        const products = [];
        for (let item of res.data) {
          products.push(item);
        }
        const meta = res.meta;
        this.setState({ products, meta });
      })
      .catch((error) => {});
  }

  changeToSkuPage(event, product) {
    window.location.href = `/sku/${product.id}`;
  }

  changeToPhotoProduct(event, product) {
    window.location.href = `/product/photo/${product.id}`;

  }

  handleRequestSort = async (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    const order = isAsc ? "desc" : "asc";
    await this.setState({
      orderBy: property,
      order: order,
    });
    this.getProduct();
  };

  handleSwitchPage = async (event, newPage) => {
    await this.setState({
      page: newPage,
    });
    this.getProduct();
  };

  handleLimitChange = async (event, limit) => {
    await this.setState({
      limit: limit,
    });

    this.getProduct();
  };
  handleDialogAddProduct = async () => {
    await this.setState({
      openAddProduct: !this.state.openAddProduct,
    });
  };

  handleOnSubmitDialog = async (product) => {
    api
      .post("/product", product)
      .then((response) => {
        this.getProduct();
      })
      .catch((error) => {
        console.log(error);
      });
    handleDialogAddProduct();
  };
  render() {
    return (
      <HomeLayout>
        <div>
          <Button onClick={this.handleDialogAddProduct}>New Product</Button>'
          <DialogAddProduct
            open={this.state.openAddProduct}
            onHandleClose={this.handleDialogAddProduct}
            onHandleSubmit={this.handleOnSubmitDialog}
          />
          <TableViewCustom
            itemsContent={this.state.products}
            itemsHeader={this.header}
            order={this.state.order}
            orderBy={this.state.orderBy}
            rowCount={this.state.meta.total_rows}
            limit={this.state.meta.limit}
            page={this.state.meta.page}
            limitList={[5, 10, 25, 50]}
            onRequestSort={this.handleRequestSort}
            onPageChange={this.handleSwitchPage}
            onLimitChange={this.handleLimitChange}
          />
        </div>
      </HomeLayout>
    );
  }
}
