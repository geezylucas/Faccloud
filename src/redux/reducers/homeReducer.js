import {COUNT_BY_XML_TYPE, GET_RECORDS, GET_RECORD} from '../constants';

const initialState = {
  totalByXMLType: [
    {
      _id: 'e',
      totalCfdis: 0,
    },
    {
      _id: 'r',
      totalCfdis: 0,
    },
  ],
  lastReceptorXML: {},
  lastEmisorXML: {},
  dataListRecords: {
    cfdis: [],
    dataPagination: {
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
    Impuestos: {
      TotalImpuestosTrasladados: 0,
      TotalImpuestosRetenidos: 0,
    },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COUNT_BY_XML_TYPE:
      return {
        ...state,
        totalByXMLType: action.payload.typesCFDI,
        lastEmisorXML: action.payload.lastEmisorCFDI,
        lastReceptorXML: action.payload.lastReceptorCFDI,
      };
    case GET_RECORDS:
      return {
        ...state,
        dataListRecords: action.payload,
      };
    case GET_RECORD:
      return Object.assign({}, state, {
        record: Object.assign({}, state.request, action.payload),
      });
    default:
      return state;
  }
}
