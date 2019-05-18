class CustomFanCard extends Polymer.Element {

    static get template() {
        return Polymer.html`
            <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
            <style>
                :host {
                    line-height: inherit;
                }
                .speed {
                    min-width: 34px;
                    max-width: 34px;
                    height: 30px;
                    margin-left: 2px;
                    margin-right: 2px;
                    background-color:'var(--dark-accent-color)';
                    border: 1px var(--dark-theme-disabled-color);
                    border-radius: 4px;
                    font-size: 11px !important;
                    text-align: center;
                    float: right !important;
                    padding: 1px;
                    font-family : inherit;
            }

            </style>
            <hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
                <div class='horizontal justified layout' on-click="stopPropagation">
                    <button
                            class='speed'
                            style='[[_offColor]]'
                            toggles name="off"
                            on-click='setSpeed'
                            disabled='[[_isOffState]]'>Off</button>
                    <button
                            class='speed'
                            style='[[_lowOnColor]]'
                            toggles name="low"
                            on-click='setSpeed'
                            disabled='[[_isOnLow]]'>Mín</button>
                    <button
                            class='speed'
                            style='[[_medOnColor]]'
                            toggles name="medium"
                            on-click='setSpeed'
                            disabled='[[_isOnMed]]'>Méd</button>
                    <button
                            class='speed'
                            style='[[_highOnColor]]'
                            toggles name="high"
                            on-click='setSpeed'
                            disabled='[[_isOnHigh]]'>Máx</button>

                    </div>
            </hui-generic-entity-row>
        `;
    }

    static get properties() {
        return {
            hass: {
                type: Object,
                observer: 'hassChanged'
            },
            _config: Object,
            _stateObj: Object,
            _lowOnColor: String,
            _medOnColor: String,
            _highOnColor: String,
            _offColor: String,
            _isOffState: Boolean,
            _isOnState: Boolean,
            _isOnLow: Boolean,
            _isOnMed: Boolean,
            _isOnHigh: Boolean
        }
    }

    setConfig(config) {
        this._config = config;
    }

    hassChanged(hass) {

        const config = this._config;
        const stateObj = hass.states[config.entity];

        let speed;
        if (stateObj && stateObj.attributes) {
            speed = stateObj.attributes.speed || 'off';
        }

        let low;
        let med;
        let high;
        let offstate;

        if (stateObj && stateObj.attributes) {
            if (stateObj.state == 'on' && stateObj.attributes.speed == 'low') {
                low = 'on';
        } else if (stateObj.state == 'on' && stateObj.attributes.speed == 'medium') {
                med = 'on';
        } else if (stateObj.state == 'on' && stateObj.attributes.speed == 'high') {
                high = 'on';
        } else {
            offstate = 'on';
        }
    }

        let lowcolor;
        let medcolor;
        let hicolor;
        let offcolor;

       if (low == 'on') {
        lowcolor = 'background-color: var(--dark-primary-color); color: white;';
    } else {
        lowcolor = '';
    }

    if (med == 'on') {
        medcolor = 'background-color: var(--dark-primary-color); color: white;';
    } else {
        medcolor = '';
    }

    if (high == 'on') {
        hicolor = 'background-color: var(--dark-primary-color); color: white;';
    } else {
        hicolor = '';
    }

    if (offstate == 'on') {
        offcolor = 'background-color: var(--dark-primary-color); color: white;';
    } else {
        offcolor = '';
    }

    this.setProperties({
        _stateObj: stateObj,
        _isOffState: stateObj.state == 'off',
        _isOnLow: low === 'on',
        _isOnMed: med === 'on',
        _isOnHigh: high === 'on',
        _lowOnColor: lowcolor,
        _medOnColor: medcolor,
        _highOnColor: hicolor,
        _offColor: offcolor
    });
}

    stopPropagation(e) {
        e.stopPropagation();
    }

    setSpeed(e) {
        const speed = e.currentTarget.getAttribute('name');
        this.hass.callService('fan', 'set_speed', {
            entity_id: this._config.entity, speed: speed
        });
    }

}

customElements.define('custom-fan-card', CustomFanCard);