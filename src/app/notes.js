/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Authentication & Route Protection /////////////////////////////////////////////////////////////

// How Authentication works
    - JSON token = encoded string which contains a lot of metadata; 
    - this token is generated on the server => the client (frontend Angular app)stores the token it recieves, and then whenever it makes a request to the server, it also sends the stored token to authorize the subsequent requests




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Dynamic Components /////////////////////////////////////////////////////////////

//
    = components created dynamically at runtime
    - dynamic components are just components that wait for something to happen in our code before being triggered 

    Dynamic components are loaded Programmatically:
        -> we want to programmatically control when that component should be loaded, or should be displayed:
        
        A. *ngIf:
        => it allows us to use a declarative approach 
        => we can simply add the component selector in our template and then we use *ngIf to load it upon a certain condition

        B. Dynamic Component Loader
        - helper utility that is no longer used
        = creating a component in code and then manually attaching it to the DOM (imperatively)
        - the component is managed & added by the developer
        - might be useful SOMETIMES

    * entryComponents, added in appModule -> showcases an array of component types, but ONLY the components that need to be created without a selector or the route content 
        -> entryComponents are omitted by default starting with Angular 9


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Angular Modules & Optimizing Angular Apps ////////////////////////////////////////////////////

// What are Modules?
    - modules = ways of bundling Angular building blocks (components, directives, services, pipes, etc) together,  
    - we need to group building blocks into Angular modules so that Angular is aware of these features (because Angular doesn't automatically scan all the files in our project)
    - every Angular app needs to have AT LEAST ONE module - the app module

    => Angular analyzes the NgModules to "understand" our application and its features
    - we use them to define all building blocks our app uses: Components, Directives, Services, etc.
    - an app requires at least one module, BUT may be split into multiple modules
    - core Angular features are included in Angular modules (e.g. FormsModule) to load them only when needed
    - we cannot use a certain feature or building block without including (declaring) it in a module

// Analyzing the AppModule:
      IMPORTANT
    - modules contain the @ngModule decorator
    - the declarations - contains an array with all the Components, Directives and Custom Pipes we're using in our application
    - the imports array - allows us to import other Modules into our Module, regardless if the Modules are Custom (our AppRoutingModule) or provided by Angular features (like FormsModule, HttpClientModule, etc.)
    - the providers array - defines all the services we want to provide

// Multiple Modules. Feature Modules:
    - Feature Modules = modules that group together components, directives, pipes
    - the BrowserModule (ngIf, ngFor, etc.) should only be imported ONCE in the AppModule => when we need to import it in multiple modules, we should use the CommonModule instead, in all the other places
    - we should always import everything we want to use, regardless of whether we already imported everything in the AppModule
    - the only exception are services, which should only be set up ONCE in the appModule and we can then access them throughout the entire application
    - when it comes to importing routes, we use the forChild() which will automatically merge the child routing configuration with the root routes

// Shared Modules 
    - if two modules share the same Components, Directives, etc., we can put them into Shared Modules and then import them into both modules
    - in the shared module, we export everything that we need to have access to from outside => we then just import the shared module everywhere we need access to all the modules aforementioned
    - IMPORTANT: We can IMPORT modules as much as we want, but we should only DECLARE them in ONE module

// The CoreModule:
    - the CoreModule is there to help the AppModule become leaner
    - for example, we have two Services and an AppComponent in the AppModule -> we could add the two Services in the CoreModule, and then add the CoreModule to the AppModule
    - the alternative to this would be to use the providedIn of the @Injectable on the services (which means we don't need to add them to the providers at all) => allows whatever we injected to be used application-wide
    - we don't need to export Services because they will be already application-wide

// Lazy Loading:
    - with lazy loading, we initially only load the root route content, and we don't load the other modules
    -> only when we visit another module's route, we load its content  
    - the advantage is that we initially only load a small code bundler, and then downloadd more code when we need it => our app is able to start faster because it has to download and parse less code on the first visit of a certain route

    - in the appRouting Module, we can specify a path and then the loadChildren property
    => loadChildren = special property in the route config which Angular understands as load the code content we point at ONLY when the user visits that path
    - we then provide a function import() with the path of the module/component we want to load when it is visited + a resolver function then() with the name of the Module
    - e.g.     loadChildren: () => import('./recipes/recipes.module').then((m) => m.RecipesModule)

// Services & Modules:
    - we can provide Services in:
    
        A. the AppModule:
            - Services are available app-wide
            - we use the root Injector
            - providing Services in the AppModule should be the default!

        B. AppComponent (or any other Components)
            - Service is only available in component-tree
            - we use the component-specific Injector
            - use if Service is only relevant for the component tree
        
        C. Eager-loaded Module (without lazy loading)
            - when a module is eager loaded, everything is bundled together initially => any Service will be available application-wide
            - the root Injector is used automatically
            - we should avoid this !

        D. Lazy-loaded Module
            - Service is ONLY available in the loaded module, and it gets its own instance
            - a separate child Injector is created by Angular => that module has its own instance of that service
            - use if service should be scoped to loaded module
    
    => we should always make Services available application-wide by either using @Injectable and providedIn: 'root', or adding them to providers in the appModule


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Deploying an Angular App  ////////////////////////////////////////////////////

// Deployment Preparation
    1. Use & check environment variables
    2. Polish & test code
    3. Build mode: Ng build -> uses ahead-of-time compilation
    4. Deploy build artifacts (generated files) to static host
        -> static host = web server that is capable of serving HTML, JavaScript, and CSS, but not capable of running any server-side languages, like PHP or NodeJS

    - environment variables = a dynamic-named value that can affect the way running processes will behave on a computer
    -> in the environments folder, the environment.ts file
    - for example if we use third-party APIs, we could store the API key in there
    


































*/
