# Plugin: Caspeco

## Rules

### `caspeco/discourage-chakra-import`

#### Why We Discourage Importing Chakra Files

In this project, we strongly encourage developers to use our Caspeco UI library, which wraps Chakra UI components, instead of importing Chakra components directly. Here’s why:

1. **Consistency**: The Caspeco UI library provides a consistent look and feel across the application by wrapping Chakra components with additional styling, configuration, or behavior specific to our design system. This ensures that all components align with our brand guidelines and provide a unified user experience.

2. **Customization**: Our Caspeco UI components may include custom logic, properties, or themes that are not available in the base Chakra components. By using Caspeco UI, developers automatically inherit this custom behavior, avoiding the need to manually apply our standards.

3. **Maintainability**: By centralizing customizations in Caspeco UI, we simplify future updates and maintenance. Changes to the design system or component behavior can be made in one place (our UI library) without requiring modifications across the codebase.

#### When It’s Valid to Use Chakra

In certain cases, such as using hooks provided by Chakra (e.g., `useDisclosure`, `useToast`, `useBreakpointValue`), it may still be valid to import Chakra files directly. These hooks often provide core functionality that integrates well with our components, and using them can enhance the logic of custom components or behaviors.

However, even in these cases, we encourage the use of any equivalent Caspeco UI hooks if they exist, to maintain consistency and benefit from our custom extensions.
