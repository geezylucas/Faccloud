import {COUNT_BY_XML_TYPE, GET_RECORDS, GET_RECORD} from '../constants';

const initialState = {
  totalByXMLType: [],
  lastReceptorXML: {},
  lastEmisorXML: {},
  dataRecords: {
    cfdis: [],
    totalRecords: {
      fieldsmatched: 0,
      pages: 1,
      totalMonto: {
        $numberDecimal: 0,
      },
    },
  },
  record: {
    Emisor: {
      Nombre: '',
      Rfc: '',
    },
    Receptor: {
      Nombre: '',
      Rfc: '',
      UsoCFDI: '',
    },
    SubTotal: 0,
    Descuento: 0,
    Total: 0,
    Fecha: '',
    TipoDeComprobante: '',
    Conceptos: [
      {
        Cantidad: 0,
        Descripcion: '',
        Importe: 0,
        ValorUnitario: 0,
      },
    ],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COUNT_BY_XML_TYPE:
      return {
        ...state,
        totalByXMLType: action.payload.typesCFDI,
        lastEmisorXML: action.payload.lastEmisorCFDI[0],
        lastReceptorXML: action.payload.lastReceptorCFDI[0],
      };
    case GET_RECORDS:
      return {
        ...state,
        dataRecords: action.payload,
      };
    case GET_RECORD:
      // TODO: Agregar validacion para que no haya problemas con el index
      return {
        ...state,
        record: action.payload[0],
      };
    default:
      return state;
  }
}
