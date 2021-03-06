import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Delete from "mdi-material-ui/Delete";

import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";
import AutocompleteSelect from "../../components/AutocompleteSelect";
import theme from "../../theme";


const styles = {
  delete: {
    marginTop: 3 * theme.spacing(1),
  },
  formLabel: {
    fontSize: 12,
  },
};


class HTTPIntegrationHeaderForm extends FormComponent {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
  }

  onChange(e) {
    super.onChange(e);
    this.props.onChange(this.props.index, this.state.object);
  }

  onDelete(e) {
    e.preventDefault();
    this.props.onDelete(this.props.index);
  }

  render() {
    if (this.state.object === undefined) {
      return(<div></div>);
    }

    return(
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <TextField
            id="key"
            label="Header name"
            margin="normal"
            value={this.state.object.key || ""}
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="value"
            label="Header value"
            margin="normal"
            value={this.state.object.value || ""}
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={1} className={this.props.classes.delete}>
          <IconButton aria-label="delete" onClick={this.onDelete}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    );    
  }
}


HTTPIntegrationHeaderForm = withStyles(styles)(HTTPIntegrationHeaderForm);


class HTTPIntegrationForm extends FormComponent {
  constructor() {
    super();
    this.addHeader = this.addHeader.bind(this);
    this.onDeleteHeader = this.onDeleteHeader.bind(this);
    this.onChangeHeader = this.onChangeHeader.bind(this);
  }

  onChange(e) {
    super.onChange(e);
    this.props.onChange(this.state.object);
  }

  addHeader(e) {
    e.preventDefault();

    let object = this.state.object;
    if(object.headers === undefined) {
      object.headers = [{}];
    } else {
      object.headers.push({});
    }

    this.props.onChange(object);
  }

  onDeleteHeader(index) {
    let object = this.state.object;
    object.headers.splice(index, 1);
    this.props.onChange(object);
  }

  onChangeHeader(index, header) {
    let object = this.state.object;
    object.headers[index] = header;
    this.props.onChange(object);
  }

  render() {
    if (this.state.object === undefined) {
      return(<div></div>);
    }

    let headers = [];
    if (this.state.object.headers !== undefined) {
      headers = this.state.object.headers.map((h, i) => <HTTPIntegrationHeaderForm key={i} index={i} object={h} onChange={this.onChangeHeader} onDelete={this.onDeleteHeader} />);
    }

    return(
      <div>
        <FormControl fullWidth margin="normal">
          <FormLabel>Headers</FormLabel>
          {headers}
        </FormControl>
        <Button variant="outlined" onClick={this.addHeader}>Add header</Button>
        <FormControl fullWidth margin="normal">
          <FormLabel>Endpoints</FormLabel>
          <TextField
            id="uplinkDataURL"
            label="Uplink data URL(s)"
            placeholder="http://example.com/uplink"
            helperText="Multiple URLs can be defined as a comma separated list. Whitespace will be automatically removed."
            value={this.state.object.uplinkDataURL || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="joinNotificationURL"
            label="Join notification URL(s)"
            placeholder="http://example.com/join"
            helperText="Multiple URLs can be defined as a comma separated list. Whitespace will be automatically removed."
            value={this.state.object.joinNotificationURL || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="statusNotificationURL"
            label="Device-status notification URL(s)"
            placeholder="http://example.com/status"
            helperText="Multiple URLs can be defined as a comma separated list. Whitespace will be automatically removed."
            value={this.state.object.statusNotificationURL || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="locationNotificationURL"
            label="Location notification URL(s)"
            placeholder="http://example.com/location"
            helperText="Multiple URLs can be defined as a comma separated list. Whitespace will be automatically removed."
            value={this.state.object.locationNotificationURL || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="ackNotificationURL"
            label="ACK notification URL(s)"
            placeholder="http://example.com/ack"
            helperText="Multiple URLs can be defined as a comma separated list. Whitespace will be automatically removed."
            value={this.state.object.ackNotificationURL || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="txAckNotificationURL"
            label="TX ACK notification URL(s)"
            placeholder="http://example.com/txack"
            helperText="This notification is sent when the downlink was acknowledged by the LoRa gateway for transmission. Multiple URLs can be defined as a comma separated list. Whitespace will be automatically removed."
            value={this.state.object.txAckNotificationURL || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="errorNotificationURL"
            label="Error notification URL(s)"
            placeholder="http://example.com/error"
            helperText="Multiple URLs can be defined as a comma separated list. Whitespace will be automatically removed."
            value={this.state.object.errorNotificationURL || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
        </FormControl>
      </div>
    );
  }
}


class InfluxDBIntegrationForm extends FormComponent {
  onChange(e) {
    super.onChange(e);
    this.props.onChange(this.state.object);
  }

  getPrecisionOptions(search, callbackFunc) {
    const precisionOptions = [
      {value: "NS", label: "Nanosecond"},
      {value: "U", label: "Microsecond"},
      {value: "MS", label: "Millisecond"},
      {value: "S", label: "Second"},
      {value: "M", label: "Minute"},
      {value: "H", label: "Hour"},
    ];

    callbackFunc(precisionOptions);
  }

  render() {
    if (this.state.object === undefined) {
      return(<div></div>);
    }

    return(
      <FormControl fullWidth margin="normal">
        <FormLabel>InfluxDB integration configuration</FormLabel>
        <TextField
          id="endpoint"
          label="API endpoint (write)"
          placeholder="http://localhost:8086/write"
          value={this.state.object.endpoint || ""}
          onChange={this.onChange}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="username"
          label="Username"
          value={this.state.object.username || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          value={this.state.object.password || ""}
          type="password"
          onChange={this.onChange}
          margin="normal"
          fullWidth
        />
        <TextField
          id="db"
          label="Database name"
          value={this.state.object.db || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="retentionPolicyName"
          label="Retention policy name"
          helperText="Sets the target retention policy for the write. InfluxDB writes to the DEFAULT retention policy if you do not specify a retention policy."
          value={this.state.object.retentionPolicyName || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <FormLabel className={this.props.classes.formLabel} required>Timestamp precision</FormLabel>
          <AutocompleteSelect
            id="precision"
            label="Select timestamp precision"
            value={this.state.object.precision || ""}
            onChange={this.onChange}
            getOptions={this.getPrecisionOptions}
          />
          <FormHelperText>
            It is recommented to use the least precise precision possible as this can result in significant improvements in compression.
          </FormHelperText>
        </FormControl>
      </FormControl>
    );
  }
}

InfluxDBIntegrationForm = withStyles(styles)(InfluxDBIntegrationForm);


class ThingsBoardIntegrationForm extends FormComponent {
  onChange(e) {
    super.onChange(e);
    this.props.onChange(this.state.object);
  }

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return(
      <FormControl fullWidth margin="normal">
        <FormLabel>ThingsBoard.io integration configuration</FormLabel>
        <TextField
          id="server"
          label="ThingsBoard.io server"
          placeholder="http://host:port"
          value={this.state.object.server || ""}
          onChange={this.onChange}
          margin="normal"
          required
          fullWidth
        />
        <FormHelperText>
          Each device must have a 'ThingsBoardAccessToken' variable assigned. This access-token is generated by ThingsBoard.
        </FormHelperText>
      </FormControl>
    );
  }
}

ThingsBoardIntegrationForm = withStyles(styles)(ThingsBoardIntegrationForm);


class MyDevicesIntegrationForm extends FormComponent {
  constructor() {
    super();

    this.endpointChange = this.endpointChange.bind(this);
  }

  onChange(e) {
    super.onChange(e);
  }

  getEndpointOptions(search, callbackFunc) {
    const endpointOptions = [
      {value: "https://lora.mydevices.com/v1/networks/chirpstackio/uplink", label: "Cayenne"},
      {value: "https://lora.iotinabox.com/v1/networks/iotinabox.chirpstackio/uplink", label: "IoT in a Box"},
      {value: "custom", label: "Custom endpoint URL"},
    ];

    callbackFunc(endpointOptions);
  }

  endpointChange(e) {
    let object = this.state.object;

    if (e.target.value === "custom") {
      object.endpoint = "";
    } else {
      object.endpoint = e.target.value;
    }

    this.setState({
      object: object,
    });
  }

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    let endpointSelect = "custom";
    if (this.state.object.endpoint === undefined) {
      endpointSelect = "";
    }

    this.getEndpointOptions("", (options) => {
      for (let opt of options) {
        if (this.state.object.endpoint === opt.value) {
          endpointSelect = this.state.object.endpoint;
        }
      }
    });

    return(
      <div>
        <FormControl fullWidth margin="normal">
          <FormLabel>myDevices endpoint</FormLabel>
          <AutocompleteSelect
            id="_endpoint"
            label="Select myDevices endpoint"
            value={endpointSelect || ""}
            getOptions={this.getEndpointOptions}
            onChange={this.endpointChange}
          />
        </FormControl>
        {endpointSelect === "custom" && <FormControl fullWidth margin="normal">
          <FormLabel>myDevices integration configuration</FormLabel>
          <TextField
            id="endpoint"
            label="myDevices API endpoint"
            placeholder="http://host:port"
            value={this.state.object.endpoint || ""}
            onChange={this.onChange}
            margin="normal"
            required
            fullWidth
          />
        </FormControl>}
      </div>
    );
  }
}


class LoRaCloudIntegrationForm extends FormComponent {
  constructor() {
    super();

    this.state = {
      tab: 0,
    };
  }

  onChange(e) {
    super.onChange(e);
  }

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return(
      <div>
        <Tabs 
          value={this.state.tab}
          indicatorColor="primary"
        >
          <Tab label="Geolocation" />
        </Tabs>
        {this.state.tab === 0 && <div>
          <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label="Geolocation enabled"
                control={
                  <Checkbox 
                    id="geolocation"
                    checked={!!this.state.object.geolocation}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>
          {!!this.state.object.geolocation && <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label="TDOA based geolocation"
                control={
                  <Checkbox 
                    id="geolocationTDOA"
                    checked={!!this.state.object.geolocationTDOA}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>}
          {!!this.state.object.geolocation && <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label="RSSI based geolocation"
                control={
                  <Checkbox 
                    id="geolocationRSSI"
                    checked={!!this.state.object.geolocationRSSI}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>}
          {!!this.state.object.geolocation && <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label="Wifi based geolocation"
                control={
                  <Checkbox 
                    id="geolocationWifi"
                    checked={!!this.state.object.geolocationWifi}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>}
          {!!this.state.object.geolocation && <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label="GNSS based geolocation (LR1110)"
                control={
                  <Checkbox 
                    id="geolocationGNSS"
                    checked={!!this.state.object.geolocationGNSS}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>}
          {!!this.state.object.geolocation && <TextField
            id="geolocationToken"
            label="Token"
            value={this.state.object.geolocationToken || ""}
            onChange={this.onChange}
            margin="normal"
            type="password"
            helperText="This token can be obtained from loracloud.com"
            required
            fullWidth
          />}
          {!!this.state.object.geolocation && (this.state.object.geolocationTDOA || this.state.object.geolocationRSSI) && <TextField
            id="geolocationBufferTTL"
            label="Geolocation buffer TTL (seconds)"
            type="number"
            margin="normal"
            value={this.state.object.geolocationBufferTTL || 0}
            onChange={this.onChange}
            helperText="The time in seconds that historical uplinks will be stored in the geolocation buffer. Used for TDOA and RSSI geolocation."
            fullWidth
          />}
          {!!this.state.object.geolocation && (this.state.object.geolocationTDOA || this.state.object.geolocationRSSI) && <TextField
            id="geolocationMinBufferSize"
            label="Geolocation minimum buffer size"
            type="number"
            margin="normal"
            value={this.state.object.geolocationMinBufferSize || 0}
            onChange={this.onChange}
            helperText="The minimum buffer size required before using geolocation. Using multiple uplinks for geolocation can increase the accuracy of the geolocation results. Used for TDOA and RSSI geolocation."
            fullWidth
          />}
          {!!this.state.object.geolocation && this.state.object.geolocationWifi && <TextField
            id="geolocationWifiPayloadField"
            label="Wifi payload field"
            value={this.state.object.geolocationWifiPayloadField || ""}
            onChange={this.onChange}
            margin="normal"
            helperText="This must match the name of the field in the decoded payload which holds array of Wifi access-points. Each element in the array must contain two keys: 1) macAddress: array of 6 bytes, 2) signalStrength: RSSI of the access-point."
            required
            fullWidth
          />}
          {!!this.state.object.geolocation && this.state.object.geolocationGNSS && <TextField
            id="geolocationGNSSPayloadField"
            label="GNSS payload field"
            value={this.state.object.geolocationGNSSPayloadField || ""}
            onChange={this.onChange}
            margin="normal"
            helperText="This must match the name of the field in the decoded payload which holds the LR1110 GNSS bytes."
            required
            fullWidth
          />}
          {!!this.state.object.geolocation && this.state.object.geolocationGNSS && <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label="Use receive timestamp for GNSS geolocation"
                control={
                  <Checkbox 
                    id="geolocationGNSSUseRxTime"
                    checked={!!this.state.object.geolocationGNSSUseRxTime}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>}
        </div>}
      </div>
    );
  }
}


class IntegrationForm extends FormComponent {
  constructor() {
    super();
    this.getKindOptions = this.getKindOptions.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(object) {
    this.setState({
      object: object,
    });
  }

  getKindOptions(search, callbackFunc) {
    const kindOptions = [
      {value: "http", label: "HTTP integration"},
      {value: "influxdb", label: "InfluxDB integration"},
      {value: "loracloud", label: "LoRa Cloud"},
      {value: "mydevices", label:"myDevices.com"},
      {value: "thingsboard", label: "ThingsBoard.io"},
    ];

    callbackFunc(kindOptions);
  }

  render() {
    if (this.state.object === undefined) {
      return(<div></div>);
    }

    return(
      <Form
        submitLabel={this.props.submitLabel}
        onSubmit={this.onSubmit}
      >
        {!this.props.update && <FormControl fullWidth margin="normal">
          <FormLabel className={this.props.classes.formLabel} required>Integration kind</FormLabel>
          <AutocompleteSelect
            id="kind"
            label="Select integration kind"
            value={this.state.object.kind || ""}
            onChange={this.onChange}
            getOptions={this.getKindOptions}
          />
        </FormControl>}
        {this.state.object.kind === "http" && <HTTPIntegrationForm object={this.state.object} onChange={this.onFormChange} />}
        {this.state.object.kind === "influxdb" && <InfluxDBIntegrationForm object={this.state.object} onChange={this.onFormChange} />}
        {this.state.object.kind === "thingsboard" && <ThingsBoardIntegrationForm object={this.state.object} onChange={this.onFormChange} />}
        {this.state.object.kind === "mydevices" && <MyDevicesIntegrationForm object={this.state.object} onChange={this.onFormChange} />}
        {this.state.object.kind === "loracloud" && <LoRaCloudIntegrationForm object={this.state.object} onChange={this.onFormChange} />}
      </Form>
    );
  }
}

export default withStyles(styles)(IntegrationForm);
