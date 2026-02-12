import { render, screen } from '@testing-library/react';
import SiteContext from '../../context/Site/SiteContext';
import AGI from './agi';

describe('test for unearnedIncomeFormElements', () => {
    test('test rendering', () => {
        const mockSite = {
            site: '{"forms":{"generalInfo":{"completed": false, "stepIndicator":"", "form_group": "", "item_description": "test", "stepIndicatorRoute":"generalInfo", "values": {"year": "2020", "citizen": "true", "validSSN":"true", "foreignIncome":"true", "claimedAsDependent":"false", "age":"24", "qualifiedHomelessYouth":"false", "student":"false"}}, "helpTips": {}, "filingStatus": {}, "agi":{"unearnedIncome":{"scholarship":{"category":"unearned", "checked":true, "info":[{"amount":"10000"}]}}}}}'
        };

        render(
            <SiteContext.Provider value={mockSite}>
                <AGI />
            </SiteContext.Provider>
        );

        const agiComponent = screen.getByTestId('scholarship');
        expect(agiComponent).toBeInTheDocument();
    });
});
