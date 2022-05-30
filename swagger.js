import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./server.js'];

const doc = {
    info: {
      version: "1.0.0",
      title: 'PFinance API',
      description: 'Description',
    },
    host: 'localhost:5000',
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      {
          "name": "Account",
          "description": "Accounts endpoints"
      },
      {
          "name": "Category",
          "description": "Categories endpoints"
      },
      {
          "name": "Group",
          "description": "Groups endpoints"
      },
      {
          "name": "Transaction",
          "description": "Transactions endpoints"
      },
      {
        "name": "User",
        "description": "Users endpoints"
    }
  ],
  securityDefinitions: {
    Authorization: {
        type: "apiKey",
        name: "Authorization",
        description: "Value: Bearer ",
        in: "header",
        scheme: 'bearer'
    }
  },
  definitions: {
    CreateUserModel: {   
      $name: "John doe",
      $email: "jdoe@gmail.com",
      $password: "password#123",
      $group: "62938b753f18a9b73998ac7b"         
    },
    UpdateUserModel: {   
      $name: "John doe",
      $email: "jdoe@gmail.com",
      $group: "62938b753f18a9b73998ac7b"         
    },
    ChangePasswordModel: {
      $oldPassword: "Password123#",
      $newPassword: "Password789#",
    },
    UserGroupModel: {
      $user_id: "6292c216d00c6e3f6699746b",
      $group_id: "62938bec3f18a9b73998ac87"
    },
    TransactionModel: {
      $type: "DEBITO",
      $value: 100,
      $date: "2022/05/30",
      $user: "6292c216d00c6e3f6699746b",
      $account: "62941fc96018855f25853280",
      $category: "629410e6d4100b5cb9cd7a72",
      $recurring: false,
      $split: false
    },
    GroupModel: {
      $name: "Grupo 05",
      $description: "Grupo G5",
      $users: [
          "6292c216d00c6e3f6699746b",
          "6292c2add00c6e3f6699746d"
      ]
    },
    CategoryModel: {
      $name: "Combustivel",
      $description: "despesas de Combustivel"
    },
    AccountModel: {
      $name: "visa itau",
      $type: "CARTAO",
      $amount: 0,
      $description: "controle cartão de credito",
      $paymant_due_day: 15,
      $statement_day: 1,
      $show_in_resume: true
    }
  }
};

const sw = new swaggerAutogen()
sw(outputFile, endpointsFiles, doc).then(async () => {
    await import('./server.js');
})