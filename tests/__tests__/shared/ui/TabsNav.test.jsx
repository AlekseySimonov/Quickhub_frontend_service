import { render, screen, fireEvent } from '@testing-library/react';
import { TabsNavigation } from '../../../../src/shared/ui/components/index';

const tabs_navItems = [
    { id: 'tab1', label: 'Tab 1', active: true },
    { id: 'tab2', label: 'Tab 2', active: false },
    { id: 'tab3', label: 'Tab 3', active: false },
];

describe('TabsNavigation Component', () => {
    const testid = 'tabs-navigation';

    beforeEach(() => {
        global.tabs_navItems = tabs_navItems;
    });

    test('renders TabsNavigation component correctly', () => {
        render(<TabsNavigation testid={testid} />);
        
        const tabsComponent = screen.getByTestId(testid);
        expect(tabsComponent).toBeInTheDocument();
        
        tabs_navItems.forEach(item => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });
    });

    test('sets the correct initial active tab', () => {
        render(<TabsNavigation testid={testid} />);
        
        const activeTab = screen.getByText('Tab 1');
        expect(activeTab).toHaveClass('active'); 
    });

    test('changes active tab on click', () => {
        render(<TabsNavigation testid={testid} />);
        
        fireEvent.click(screen.getByText('Tab 2'));
        
        expect(screen.getByText('Tab 2')).toHaveClass('active');
        
        expect(screen.getByText('Tab 1')).not.toHaveClass('active');
    });

    test('maintains active state when clicking the same tab', () => {
        render(<TabsNavigation testid={testid} />);
        
        fireEvent.click(screen.getByText('Tab 1'));
        
        expect(screen.getByText('Tab 1')).toHaveClass('active');
    });
});