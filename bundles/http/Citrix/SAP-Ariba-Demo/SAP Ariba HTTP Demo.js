const date = new Date().toLocaleDateString()
const _ = library.load('lodash');

integration.define({
  actions: [
    {
      name: 'updateReport',
      parameters: [
        {
          name: 'ID',
          type: 'STRING',
          required: true
        },
        {
          name: 'Status',
          type: 'STRING',
          required: true
        },
        {
          name: 'Category',
          type: 'STRING'
        },
        {
          name: 'OwnerName',
          type: 'STRING'
        },
        {
          name: 'OwnerMail',
          type: 'STRING'
        },
        {
          name: 'DateSubmitted',
          type: 'DATE'
        },
        {
          name: 'TotalAmount',
          type: 'DOUBLE'
        },
        {
          name: 'CurrencyCode',
          type: 'STRING'
        },
        {
          name: 'Comment',
          type: 'STRING'
        }
      ],
      function: updateReport
    }
  ],
  synchronizations: [
    {
      name: 'reports',
      fullSyncFunction: syncReports,
      incrementalSyncFunction: incrementalSynch
    }
  ],
  model: {
    tables: [
      {
        name: 'reports',
        columns: [
          {
            name: 'ID',
            type: 'STRING',
            length: 255,
            primaryKey: true
          },
          {
            name: 'Category',
            type: 'STRING',
            length: 255
          },
          {
            name: 'OwnerName',
            type: 'STRING',
            length: 32
          },
          {
            name: 'OwnerMail',
            type: 'STRING',
            length: 32
          },
          {
            name: 'DateSubmitted',
            type: 'DATE'
          },
          {
            name: 'TotalAmount',
            type: 'DOUBLE'
          },
          {
            name: 'CurrencyCode',
            type: 'STRING',
            length: 3
          },
          {
            name: 'Status',
            type: 'STRING',
            length: 32
          },
          {
            name: 'Comment',
            type: 'STRING'
          }
        ]
      },
      {
        name: 'expenses',
        columns: [
          {
            name: 'ID',
            type: 'STRING',
            length: 255,
            primaryKey: true
          },
          {
            name: 'Supplier',
            type: 'STRING',
            length: 255
          },
          {
            name: 'Category',
            type: 'STRING',
            length: 255
          },
          {
            name: 'Description',
            type: 'STRING'
          },
          {
            name: 'Price',
            type: 'DOUBLE'
          },
          {
            name: 'CurrencyCode',
            type: 'STRING',
            length: 3
          },
          {
            name: 'Quantity',
            type: 'DOUBLE'
          },
          {
            name: 'TransactionDate',
            type: 'DATE',
          },
          {
            name: 'ReportID',
            type: 'STRING',
          },
          {
            name: 'Total',
            type: 'DOUBLE',
          }
        ]
      },
      {
        name: 'categories',
        columns: [
          {
            name: 'Category',
            type: 'STRING',
            length: 255,
            primaryKey: true
          },
          {
            name: 'ImageURL',
            type: 'STRING',
            length: 512
          }
        ]
      }
    ],
    relationships: [
      {
        name: 'expense_report',
        primaryTable: 'reports',
        foreignTable: 'expenses',
        columnPairs: [
          {
            primaryKey: 'ID',
            foreignKey: 'ReportID'
          }
        ]
      },
      {
        name: 'expenses_categories',
        primaryTable: 'reports',
        foreignTable: 'categories',
        columnPairs: [
          {
            primaryKey: 'Category',
            foreignKey: 'Category'
          }
        ]
      }
    ]
  }
})

const reports = [
  {
      ID: '12372844', 
      Category: 'Appliances', 
      OwnerName: 'Aline Gomes', 
      OwnerMail: 'aline.gomes@acme.com',
      DateSubmitted: date, 
      TotalAmount: 0, 
      CurrencyCode: 'USD',
      Comment: '', 
      Status: 'Submitted'
      },
      {
      ID: '12372845', 
      Category: 'Appliances', 
      OwnerName: 'Billy Taylor', 
      OwnerMail: 'billy.taylor@acme.com',
      DateSubmitted: date, 
      TotalAmount: 0, 
      CurrencyCode: 'USD',
      Comment: '', 
      Status: 'Submitted'
      },
      {
      ID: '12372846', 
      Category: 'Training', 
      OwnerName: 'Marijan Humerca', 
      OwnerMail: 'marijan.humerca@acme.com',
      DateSubmitted: date, 
      TotalAmount: 0, 
      CurrencyCode: 'USD', 
      Comment: '', 
      Status: 'Submitted'
      },
      {
      ID: '12372847', 
      Category: 'Office Supplies', 
      OwnerName: 'Mark Smith', 
      OwnerMail: 'mark.smith@acme.com',
      DateSubmitted: date, 
      TotalAmount: 0, 
      CurrencyCode: 'USD',
      Comment: '',  
      Status: 'Submitted'
      },
      {
      ID: '12372848', 
      Category: 'Office Software', 
      OwnerName: 'Robert Clayton', 
      OwnerMail: 'robert.clayton@acme.com',
      DateSubmitted: date, 
      TotalAmount: 0, 
      CurrencyCode: 'USD', 
      Comment: '', 
      Status: 'Submitted'
      },
      {
      ID: '12372849', 
      Category: 'Maintenance', 
      OwnerName: 'Sarah Silva', 
      OwnerMail: 'sarah.silva@acme.com',
      DateSubmitted: date, 
      TotalAmount: 0, 
      CurrencyCode: 'USD', 
      Comment: '', 
      Status: 'Submitted'
      }  
]

const expenses = [
  {
      ID: '19710704432971771', 
      Supplier: 'JB Hifi', 
      Category: 'Appliances',
      Description: 'Printer',
      TransactionDate: date, 
      Price: 500, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportID: '12372844',
      Total: 500
      },
      {
      ID: '19710704432971772', 
      Supplier: 'JB Hifi', 
      Category: 'Appliances',
      Description: 'Scanner',
      TransactionDate: date, 
      Price: 400, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportID: '12372845',
      Total: 400
      },
      {
      ID: '19710704432971773', 
      Supplier: 'Linkedin Learning', 
      Category: 'Training',
      Description: 'JavaScript Course',
      TransactionDate: date, 
      Price: 100, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportID: '12372846',
      Total: 100
      },
      {
      ID: '19710704432971774', 
      Supplier: 'Linkedin Learning', 
      Category: 'Training',
      Description: 'Cloud Concepts Course',
      TransactionDate: date, 
      Price: 120, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportID: '12372846',
      Total: 120
      },
      {
      ID: '19710704432971775', 
      Supplier: 'Staples', 
      Category: 'Office Supplies',
      Description: 'Printer Paper',
      TransactionDate: date,  
      Price: 50.25, 
      CurrencyCode: 'USD', 
      Quantity: 10,
      ReportID: '12372847',
      Total: 502.50
      },
      {
      ID: '19710704432971776', 
      Supplier: 'Staples', 
      Category: 'Office Supplies',
      Description: 'Ink Cartridges',
      TransactionDate: date, 
      Price: 120.50, 
      CurrencyCode: 'USD', 
      Quantity: 12,
      ReportID: '12372847',
      Total: 1446
      },
      {
      ID: '19710704432971777', 
      Supplier: 'Office Depot', 
      Category: 'Office Supplies',
      Description: 'General Stationary',
      TransactionDate: date, 
      Price: 30, 
      CurrencyCode: 'USD', 
      Quantity: 5,
      ReportID: '12372847',
      Total: 150
      },
      {
      ID: '19710704432971778', 
      Supplier: 'Microsoft', 
      Category: 'Office Software',
      Description: 'Microsoft 365 Subscription',
      TransactionDate: date, 
      Price: 30, 
      CurrencyCode: 'USD', 
      Quantity: 5,
      ReportID: '12372848',
      Total: 150
      },
      {
      ID: '19710704432971779', 
      Supplier: 'Electrician', 
      Category: 'Maintenance',
      Description: 'Fix lights',
      TransactionDate: date, 
      Price: 75.60, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportID: '12372849',
      Total: 75.60
      }
]

const categories = [
  {
    Category: 'Appliances',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/folder.462b3c7e85bf4fa6e7a50801cd400bd2.svg'
  },
  {
    Category: 'Maintenance',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/incident.e71280c2c22b2abd3aba06971728c296.svg'
  },
  {
    Category: 'Training',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/course.fa9aabf2ac03cfad305b04ed8db96430.svg'
  },
  {
    Category: 'Other',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/feedback.c533ed2d280d39d9288b2fd741a18651.svg'
  },
  {
    Category: 'Office Supplies',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/case.2bb73f1b3eff52a8134fd591447bdaa1.svg'
  },
  {
    Category: 'Office Software',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/report_update.2d453d1646665c2ede6de83f848a6566.svg'
  }
]

async function syncReports ({ dataStore, integrationParameters }) {
  console.log('Synching data...')

  const saveReports = calculateReportsWithTotals(expenses, reports)

  dataStore.save('reports', saveReports)
  dataStore.save('expenses', expenses)
  dataStore.save('categories', categories)
  console.log("Synchronization complete")
}

function calculateTotalAmount(reportId, expenses) {
  return expenses.filter((expense) => expense.ReportID === reportId).reduce((result, expense) => result + expense.Price*expense.Quantity, 0)
}

function calculateReportsWithTotals(expenses, reports) {
  return reports.map(report => ({...report, TotalAmount: calculateTotalAmount(report.ID, expenses)}))
}

function cloneViaJson(list){
  return JSON.parse(JSON.stringify(list))
}

function getRandomReport(list){
  return cloneViaJson(list[Math.floor(Math.random() * (list.length))])
}

function createReportID(id, list){
  id = parseInt(id)
  const new_id = id + Math.floor(Math.random() * (1000 - list.length)) + list.length
  return new_id.toString()
}

function getNumOfExpenses(list){
  return Math.floor(Math.random() * (list.length - 1)) + 1
}

function generateRandomNumValue(floor, ceiling) {
  return Math.floor(Math.random()* (ceiling - floor)) + floor
}

function calculateTotalAmountForNewReport(expenses, report) {
  const totalAmount = expenses.reduce((acc, {Total}) => acc + Total, 0)
  return ({...report, TotalAmount: totalAmount})
}

async function incrementalSynch({dataStore, client}) {
  console.log("Running incremental synchronization...")
  const report = getRandomReport(reports)
  report.ID = createReportID(report.ID, reports)

  const expensechoices = [] //possible expenses in report's category
  for (let i=0; i< expenses.length; i++) {
    const expense = cloneViaJson(expenses[i])
    if (expense.Category == report.Category){
      expensechoices.push(expense)
    }
  }

  const numOfExpenses =  getNumOfExpenses(expensechoices)

  const newExpenses = _.range(0, numOfExpenses).map(i => {
    const expense = cloneViaJson(expensechoices[Math.floor(Math.random() * (expensechoices.length))])
    expense.ReportID = report.ID
    expense.TransactionDate = report.DateSubmitted
    expense.ID = expense.ID.slice(0,12) + (generateRandomNumValue(1, 99999)).toString()
    return expense
  })

  const reportToSave = calculateTotalAmountForNewReport(newExpenses, report)
  dataStore.save('reports', reportToSave)
  dataStore.save('expenses', newExpenses)
  console.log("Incremental synchronization completed...")
}

async function updateReport({ dataStore, client, actionParameters, integrationParameters }) {
  console.log(`Updating report with id ${actionParameters.ID}...`)
  const report = _.pick(actionParameters, ['ID', 'Category', 'OwnerName', 'OwnerMail', 'DateSubmitted', 'TotalAmount', 'CurrencyCode', 'Comment', 'Status'])
  dataStore.save('reports', report)
  console.log(`Report with id ${actionParameters.ID} updated`)
}