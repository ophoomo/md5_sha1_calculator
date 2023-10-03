import { Button, Divider, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Buffer } from "buffer";
import Swal from "sweetalert2";

function App() {
  const onFinishMod = (values: any) => {
    let text = "";
    let hexStr = (
      (parseInt(values.Input1, 16) + parseInt(values.Input2, 16)) %
      parseInt(values.Mod, 16)
    ).toString(16);
    while (hexStr.length < 6) {
      hexStr = "0" + hexStr;
    } // Zero pad.
    text = hexStr;
    Swal.fire({
      text: text.toUpperCase(),
      allowOutsideClick: false,
    });
  };
  const onFinishMD5 = (values: any) => {
    const Input1 = values.Input1;
    const Input2 = values.Input2;
    let text = '';
    const Input3 = values.Input3;
    const Round = values.Round;
    if (Round == "1") {
      // text = ((Input1 & Input2) | (~Input1 & Input3)).toString(16);
      text = orbit(andbit(Input1, Input2), andbit((~parseInt(Input1,16)).toString(16), Input3));
    } else if (Round == "2") {
      text = orbit(andbit(Input1, Input3), andbit(Input2, (~parseInt(Input3)).toString(16)))
      // text = ((Input1 & Input3) | (Input2 & ~Input3)).toString(16);
    } else if (Round == "3") {
      // text = (Input1^Input2^Input3).toString(16);
      text = xor(xor(Input1, Input2), Input3);
    } else {
      text = xor(Input2, orbit(Input1, (~parseInt(Input3)).toString(16)))
      // text = (Input2^(Input1 | ~Input3)).toString(16);
    }
    while (text.length < 6) {
      text = "0" + text;
    } // Zero pad.
    Swal.fire({
      text: text.toUpperCase(),
      allowOutsideClick: false,
    });
  };
  const onFinishSHA1 = (values: any) => {
    let text = '';
    const Input1 = values.Input1;
    const Input2 = values.Input2;
    const Input3 = values.Input3;
    const Round = values.Round;
    if (Round == "1") {
      text = orbit(andbit(Input1, Input2), andbit((~parseInt(Input1,16)).toString(16), Input3));
    } else if (Round == "2") {
      text = xor(xor(Input1, Input2), Input3)
    } else if (Round == "3") {
      text = orbit(orbit(andbit(Input1, Input2), andbit(Input1,Input3)),andbit(Input2, Input3));
    } else {
      text = xor(xor(Input1, Input2), Input3)
    }
    Swal.fire({
      text: text.toUpperCase(),
      allowOutsideClick: false,
    });
  };
  const onFinishXOR = (values: any) => {
    let text = "";
    const Input1 = values.Input1;
    const Input2 = values.Input2;
    const Input3 = values.Input3;
    const Input4 = values.Input4;
    const result1 = xor(Input1, Input2);
    const result2 = xor(result1, Input3);
    text = xor(result2, Input4);
    Swal.fire({
      text: text.toUpperCase(),
      allowOutsideClick: false,
    });
  };
  const onFinishT = (values: any) => {
    let text = "";
    const t = values.T;
    text += " " + (t - 16) + " " + (t - 14) + " " + (t - 8) + " " + (t - 3);
    Swal.fire({
      text: text.toUpperCase(),
      allowOutsideClick: false,
    });
  };
  // const onFinishLEFTBIT = (values: any) => {
  //   let text = "";
  //   const input1 = parseInt(values.Input1, 16);
  //   const input2 = parseInt(values.Input2, 16);
  //   text = ((input1 << input2)).toString(16);
  //   while (text.length < 6) {
  //     text = "0" + text;
  //   } // Zero pad.
  //   Swal.fire({
  //     text: text.toUpperCase(),
  //     allowOutsideClick: false,
  //   });
  // };
  function buf2hex(buffer: Uint8Array) {
    // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  }
  const xor = (hex1: string, hex2: string) => {
    const buf1 = Buffer.from(hex1, "hex");
    const buf2 = Buffer.from(hex2, "hex");
    const bufResult = buf1.map((b: number, i: number) => b ^ buf2[i]);
    return buf2hex(bufResult);
  };
  const andbit = (hex1: string, hex2: string) => {
    const buf1 = Buffer.from(hex1, "hex");
    const buf2 = Buffer.from(hex2, "hex");
    const bufResult = buf1.map((b: number, i: number) => b & buf2[i]);
    return buf2hex(bufResult);
  };
  const orbit = (hex1: string, hex2: string) => {
    const buf1 = Buffer.from(hex1, "hex");
    const buf2 = Buffer.from(hex2, "hex");
    const bufResult = buf1.map((b: number, i: number) => b | buf2[i]);
    return buf2hex(bufResult);
  };
  return (
    <div>
      <Divider>Modular Addition</Divider>
      <Form
        initialValues={{
          Mod: 100000000,
        }}
        onFinish={onFinishMod}
      >
        <Form.Item
          name="Input1"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input 1" />
        </Form.Item>
        <Form.Item
          name="Input2"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input 2" />
        </Form.Item>
        <Form.Item
          name="Mod"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input value={100000000} placeholder="Mod" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider>MD5 Function</Divider>
      <Form
        initialValues={{
          Round: "1",
        }}
        onFinish={onFinishMD5}
      >
        <Form.Item
          name="Input1"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input B" />
        </Form.Item>
        <Form.Item
          name="Input2"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input C" />
        </Form.Item>
        <Form.Item
          name="Input3"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input D" />
        </Form.Item>
        <Form.Item
          name="Round"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Select defaultValue={"1"} style={{ width: "100%" }}>
            <Option value="1">Round1</Option>
            <Option value="2">Round2</Option>
            <Option value="3">Round3</Option>
            <Option value="4">Round4</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider>SHA1 Function</Divider>
      <Form
        initialValues={{
          Round: "1",
        }}
        onFinish={onFinishSHA1}
      >
        <Form.Item
          name="Input1"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input B" />
        </Form.Item>
        <Form.Item
          name="Input2"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input C" />
        </Form.Item>
        <Form.Item
          name="Input3"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input D" />
        </Form.Item>
        <Form.Item
          name="Round"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Select defaultValue={"1"} style={{ width: "100%" }}>
            <Option value="1">Round1</Option>
            <Option value="2">Round2</Option>
            <Option value="3">Round3</Option>
            <Option value="4">Round4</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider>T Number</Divider>
      <Form onFinish={onFinishT}>
        <Form.Item
          name="T"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="T Number" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider>XOR FOR T</Divider>
      <Form onFinish={onFinishXOR}>
        <Form.Item
          name="Input1"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input 1" />
        </Form.Item>
        <Form.Item
          name="Input2"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input 2" />
        </Form.Item>
        <Form.Item
          name="Input3"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input 3" />
        </Form.Item>
        <Form.Item
          name="Input4"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input 4" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider>LEFT BIT</Divider>
      {/* <Form onFinish={onFinishLEFTBIT}>
        <Form.Item
          name="Input1"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Input 1" />
        </Form.Item>
        <Form.Item
          name="Input2"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input placeholder="Step" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
    </div>
  );
}

export default App;
