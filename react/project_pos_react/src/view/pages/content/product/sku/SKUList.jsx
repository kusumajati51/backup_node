import { Component } from "react";
import HomeLayout from "../../../../layout/HomeLayout";
import { useParams } from "react-router-dom";
import { withRouter } from "../../../../../routes/withParams";
import { api } from "../../../../../service/api/axios";
import TableViewCustom from "../../../../component/list/TableViewCustom";
import { Button } from "@mui/material";
import DialogAddSku from "../../../../component/dialog/DialogAddSku";

class SKUListContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: [],
      meta: {},
      count: 0,
      order: "asc",
      orderBy: "id",
      limit: 5,
      page: 1,
      openAddSku: false,
    };
  }
  header = [
    {
      name: "ID",
      text: { value: "id", align: "left" },
      align: "left",
      sort: "id",
    },
    {
      name: "Product Name",
      text: { value: "product.name", align: "left" },
      align: "left",
    },
    {
      name: "Name",
      text: { value: "name", align: "left" },
      align: "left",
      sort: "name",
    },
    {
      name: "Price",
      text: { value: "price", align: "left" },
      align: "left",
      sort: "price",
    },
  ];

  componentDidMount() {
    this.getSKU();
  }

  getSKU() {
    let id = this.props.params.id;
    api
      .get("/product/sku/index/" + id, {
        params: {
          limit: this.state.limit,
          page: this.state.page,
          order_by: this.state.orderBy,
          order: this.state.order,
        },
      })
      .then((res) => {
        const sku = [];
        for (let item of res.data) {
          sku.push(item);
        }
        const meta = res.meta;
        this.setState({ sku, meta });
      })
      .catch((error) => {});
  }
  handleRequestSort = async (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    const order = isAsc ? "desc" : "asc";
    await this.setState({
      orderBy: property,
      order: order,
    });
    // console.log(this.state)
    this.getSKU();
  };

  handleSwitchPage = async (event, newPage) => {
    await this.setState({
      page: newPage,
    });

    this.getSKU();
  };

  handleLimitChange = async (event, limit) => {
    await this.setState({
      limit: limit,
    });

    this.getSKU();
  };

  handleDialogAddSku = async () => {
    await this.setState({
      openAddSku: !this.state.openAddSku,
    });
  };

  handleOnSubmitDialog = async (sku) => {
    let id = this.props.params.id;
    api
      .post("/product/sku/" + id, sku)
      .then((response) => {
        this.getSKU();
      })
      .catch((error) => {
        console.log(error);
      });
    this.handleDialogAddSku();
  }; 

  render() {
    return (
      <HomeLayout>
        <Button onClick={this.handleDialogAddSku}>New SKU</Button>
        <DialogAddSku
            open={this.state.openAddSku}
            onHandleClose={this.handleDialogAddSku}
            onHandleSubmit={this.handleOnSubmitDialog}
          />
        <TableViewCustom
          itemsContent={this.state.sku}
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
      </HomeLayout>
    );
  }
}

const SKUList = withRouter(SKUListContent);

export default SKUList;
