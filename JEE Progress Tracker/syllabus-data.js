/*
 * JEE Main 2027 unit outlines and offline revision cards.
 * The unit/topic outline follows the latest NTA syllabus published when
 * this tracker was updated. Each topic has an offline ten-card recall deck.
 */
(() => {
  // Every topic gets a ten-card offline deck with varied retrieval prompts.
  // The short answer is the topic's approved core fact; prompt styles make
  // students retrieve it in different ways rather than searching on demand.
  const makeDeck = (name, question, answer) => {
    // Formula-bearing notes get an additional equation recall and cloze card.
    const equation = answer.match(/[^;.!?]*=[^;.!?]*/)?.[0]?.trim() || '';
    const blankedAnswer = equation ? answer.replace(equation, '_____') : `_____ — ${answer}`;
    const cards = [
      ['Direct recall', question, answer],
      ['Key idea', `What is the key idea behind ${name}?`, answer],
      ['Quick explain', `Explain ${name} in one concise statement.`, answer],
      ['Exam recall', `What should you write first when asked about ${name}?`, answer],
      ['Principle check', `Which main rule, definition, or relation should you recall for ${name}?`, answer],
      ['Teach-back', `Teach ${name} to a classmate in one sentence.`, answer],
      ['One-line summary', `Summarise ${name} without a derivation.`, answer],
      ['Rapid review', `What is the most important result to remember for ${name}?`, answer],
      ['Concept check', `True or false: the key result for ${name} follows its defining principle.`, `True. ${answer}`],
      equation
        ? ['Equation cloze', `Complete the relation: ${blankedAnswer}`, equation]
        : ['Memory prompt', `Complete this recall: “${name} means / gives …”`, answer]
    ];
    if(equation){
      cards[3] = ['Equation recall', `Write the key equation in ${name}.`, equation];
    }
    return cards.map(([type, prompt, response])=>({type, question:prompt, answer:response}));
  };

  const chapter = (category, title, entries) => ({
    category,
    title,
    topics: entries.map(([name, question, answer]) => ({
      name,
      cards: makeDeck(name, question, answer)
    }))
  });

  window.JEE_SYLLABUS = {
    physics: [
      chapter('Mechanics', 'Units and Measurements', [
        ['SI units and dimensions', 'What is the dimensional formula of force?', 'Force = mass × acceleration, so its dimensions are [M L T⁻²].'],
        ['Significant figures and errors', 'How do absolute and relative errors differ?', 'Absolute error has the unit of the measured quantity; relative error is absolute error divided by the measured value.'],
        ['Dimensional analysis', 'What can dimensional analysis check?', 'It can check dimensional consistency and help infer relations, but it cannot determine dimensionless constants or additive terms.'],
        ['Fundamental and derived units', 'What distinguishes a fundamental unit from a derived unit?', 'A fundamental unit is an independent base; derived units are products or quotients of base units, such as N = kg·m·s⁻².'],
        ['Accuracy, precision and least count', 'What does an instrument’s least count describe?', 'The smallest change in a quantity that the instrument can resolve; precision is repeatability, while accuracy is closeness to the true value.'],
        ['Propagation of measurement errors', 'For z = x ± y, how do maximum absolute errors combine?', 'For independent maximum-error bounds, Δz = Δx + Δy. For products or quotients, relative errors add.']
      ]),
      chapter('Mechanics', 'Kinematics', [
        ['One-dimensional motion', 'For constant acceleration, what is the relation between v, u, a and s?', 'v² − u² = 2as; also v = u + at and s = ut + ½at².'],
        ['Projectile motion', 'What is the time of flight for a projectile launched at speed u and angle θ on level ground?', 'T = 2u sin θ / g. Horizontal and vertical motions are treated independently.'],
        ['Relative and circular motion', 'What is centripetal acceleration?', 'It points toward the centre and has magnitude v²/r = ω²r.'],
        ['Position, displacement and frame of reference', 'How does displacement differ from distance?', 'Displacement is the directed change in position and depends only on endpoints; distance is the path length.'],
        ['Average and instantaneous velocity', 'How is instantaneous velocity defined from position?', 'v⃗ = d r⃗/dt; average velocity over an interval is total displacement divided by elapsed time.'],
        ['Motion graphs', 'What does the slope of a position–time graph represent?', 'Velocity. The slope of a velocity–time graph is acceleration, and its signed area is displacement.'],
        ['Vector components and products', 'What is the magnitude of a vector with perpendicular components Aₓ and Aᵧ?', 'A = √(Aₓ² + Aᵧ²); the dot product is scalar and the cross product is vector-valued.']
      ]),
      chapter('Mechanics', 'Laws of Motion', [
        ['Newton’s laws and momentum', 'State Newton’s second law in momentum form.', 'The net force equals the rate of change of momentum: F⃗ = dp⃗/dt.'],
        ['Impulse and conservation', 'What is impulse?', 'J⃗ = ∫F⃗dt = Δp⃗; in an isolated system total momentum is conserved.'],
        ['Friction and banked roads', 'For a frictionless banked road, what supplies centripetal force?', 'The horizontal component of the normal force; tan θ = v²/(rg).'],
        ['Free-body diagrams and force balance', 'What condition is required for translational equilibrium?', 'The vector sum of external forces is zero: ΣF⃗ = 0. Draw all real forces on the chosen body.'],
        ['Static and kinetic friction', 'How is limiting friction related to normal force?', 'At impending slip, f_max = μ_sN; during sliding, kinetic friction is approximately f_k = μ_kN.'],
        ['Action–reaction pairs', 'Why do Newton’s third-law forces not cancel on one free-body diagram?', 'They act on two different bodies, so they cannot cancel in the force sum for a single body.'],
        ['Circular-motion force balance', 'Which force supplies centripetal force in circular motion?', 'The inward component of the net real force; “centripetal force” names the resultant, not an extra force.']
      ]),
      chapter('Mechanics', 'Work, Energy and Power', [
        ['Work and work–energy theorem', 'What does the net work on a particle equal?', 'The change in kinetic energy: W_net = ΔK.'],
        ['Conservative forces and potential energy', 'How is a one-dimensional conservative force related to potential energy?', 'F(x) = −dU/dx; work by the force is −ΔU.'],
        ['Collisions and power', 'What is the coefficient of restitution e?', 'e = relative speed of separation / relative speed of approach along the line of impact.'],
        ['Work by variable forces', 'How is work by a variable force calculated?', 'W = ∫F⃗·dr⃗ along the path; on a force–position graph, signed area gives work.'],
        ['Spring potential energy', 'What is the potential energy of an ideal spring displaced by x?', 'U = ½kx², taking zero potential energy at the natural length.'],
        ['Mechanical-energy conservation', 'When is mechanical energy conserved?', 'When only conservative forces do work; K + U then remains constant.'],
        ['Vertical circular motion', 'What is the minimum speed at the top for a string to remain just taut?', 'v_top = √(gR), where tension is zero at the limiting case.']
      ]),
      chapter('Mechanics', 'Rotational Motion', [
        ['Centre of mass of particles', 'How is the centre of mass of point masses calculated?', 'r⃗_cm = (Σmᵢr⃗ᵢ)/(Σmᵢ); it is the mass-weighted position average.'],
        ['Centre of mass of rigid bodies', 'Where is the centre of mass of a uniform thin rod?', 'At its midpoint by symmetry; for a continuous body use r⃗_cm = (1/M)∫r⃗ dm.'],
        ['Centre-of-mass motion and momentum', 'What determines the acceleration of a system’s centre of mass?', 'M a⃗_cm = F⃗_external; internal forces cancel in the total momentum equation.'],
        ['Torque and moment arm', 'What is the magnitude of torque about a point?', 'τ = rF sin θ = F times the perpendicular moment arm.'],
        ['Angular momentum and its conservation', 'When is angular momentum conserved?', 'When net external torque is zero; L⃗ = r⃗×p⃗ for a particle and L = Iω for a rigid body about a fixed principal axis.'],
        ['Rotational equations of motion', 'What is the fixed-axis rotational equation of motion?', 'τ_net = Iα when I is constant; rotational kinematics mirror linear kinematics for constant angular acceleration.'],
        ['Moment of inertia and radius of gyration', 'How are moment of inertia I and radius of gyration k related?', 'I = Mk², where k is the distance from the axis at which all mass could be concentrated with the same I.'],
        ['Standard moments of inertia', 'What is the moment of inertia of a thin ring about its central axis?', 'I = MR². For a uniform disc about its central perpendicular axis, I = ½MR².'],
        ['Parallel- and perpendicular-axis theorems', 'State both axes theorems.', 'Parallel axis: I = I_cm + Md². For a plane lamina, perpendicular axis: I_z = I_x + I_y.'],
        ['Rigid-body equilibrium', 'What are the conditions for static equilibrium of a rigid body?', 'Both net external force and net external torque must be zero: ΣF⃗=0 and Στ⃗=0.'],
        ['Rolling without slipping', 'What is the no-slip relation between translation and rotation?', 'v_cm = ωR and a_cm = αR along the rolling direction.'],
        ['Rotational work, energy and power', 'What is the rotational kinetic energy about a fixed axis?', 'K_rot = ½Iω²; rotational work is ∫τdθ and power is τω for aligned torque and angular velocity.']
      ]),
      chapter('Mechanics', 'Gravitation', [
        ['Newton’s law and gravitational field', 'What is the gravitational field outside a spherical mass M?', 'g(r) = GM/r² toward the centre; gravitational potential is V = −GM/r.'],
        ['Variation of g and Kepler’s laws', 'How does g vary with altitude h for h ≪ R?', 'Approximately g_h ≈ g(1 − 2h/R). Kepler’s third law gives T² ∝ r³.'],
        ['Satellites and escape speed', 'What is the orbital speed in a circular orbit of radius r?', 'v = √(GM/r); escape speed from radius R is √(2GM/R).'],
        ['Gravitational potential energy', 'What is the gravitational potential energy of masses m and M separated by r?', 'U = −GMm/r when zero potential energy is chosen at infinity.'],
        ['Variation of gravity with depth', 'How does g vary at depth d inside a uniform-density Earth?', 'In the uniform-density approximation, g_d = g_surface(1−d/R).'],
        ['Satellite period and energy', 'What is the total mechanical energy of a satellite in a circular orbit?', 'E = −GMm/(2r); its period satisfies T² = 4π²r³/(GM).']
      ]),
      chapter('Properties of Matter', 'Properties of Solids and Liquids', [
        ['Elasticity', 'What is Young’s modulus?', 'Y = longitudinal stress / longitudinal strain, within the elastic limit.'],
        ['Fluid pressure and flow', 'State Bernoulli’s equation for steady ideal flow.', 'P + ½ρv² + ρgh is constant along a streamline.'],
        ['Viscosity and surface tension', 'What is terminal speed for a small sphere under Stokes drag?', 'For a sphere in a viscous fluid, v_t = 2r²(ρ_s−ρ_f)g/(9η), when Stokes’ law applies.'],
        ['Thermal properties and heat transfer', 'What is the heat conducted through a slab per unit time?', 'Q/t = kAΔT/L for steady one-dimensional conduction.'],
        ['Stress, strain and elastic energy', 'What is elastic potential energy per unit volume for a linearly elastic material?', 'It is ½ × stress × strain, within the linear elastic region.'],
        ['Pascal law and hydraulic devices', 'What does Pascal’s law say?', 'A pressure change applied to an enclosed fluid is transmitted undiminished throughout the fluid.'],
        ['Continuity and Bernoulli equations', 'For steady incompressible flow, what is the continuity relation?', 'A₁v₁ = A₂v₂; fluid speed rises where the cross-sectional area narrows.'],
        ['Surface tension and capillarity', 'What determines the height of capillary rise?', 'For a capillary tube, h = 2T cosθ/(ρgr), where T is surface tension and r is tube radius.'],
        ['Thermal expansion and calorimetry', 'What is linear thermal expansion for a small temperature change?', 'ΔL = αL₀ΔT.'],
        ['Specific heat and latent heat', 'What heat is needed for a phase change at fixed temperature?', 'Q = mL, where L is the latent heat for that transition.'],
        ['Conduction, convection and radiation', 'Which heat-transfer modes require a material medium?', 'Conduction and convection do; thermal radiation can travel through vacuum.']
      ]),
      chapter('Thermal Physics', 'Thermodynamics', [
        ['Zeroth law and thermal equilibrium', 'What does the zeroth law establish?', 'If A is in thermal equilibrium with C and B with C, A and B are in thermal equilibrium; this underpins temperature.'],
        ['First law and thermodynamic processes', 'Using work done by the system, what is the first law?', 'ΔQ = ΔU + W. For an ideal gas, internal energy depends only on temperature.'],
        ['Second law and entropy', 'What is the entropy criterion for a spontaneous process in an isolated system?', 'Total entropy increases: ΔS_universe > 0; it is constant for an ideal reversible process.'],
        ['State variables and internal energy', 'For a fixed amount of ideal gas, what determines internal energy?', 'Temperature alone; internal energy is a state function.'],
        ['Isothermal and adiabatic processes', 'What is true of an adiabatic process?', 'No heat is exchanged: Q=0. In a reversible ideal-gas adiabatic process, PV^γ is constant.'],
        ['Heat engines and refrigerators', 'What is the efficiency of a heat engine?', 'η = work output / heat absorbed from the hot reservoir; it is less than one.']
      ]),
      chapter('Thermal Physics', 'Kinetic Theory of Gases', [
        ['Ideal gas and pressure', 'What is the ideal-gas equation?', 'PV = nRT = Nk_BT.'],
        ['RMS speed and temperature', 'What is the rms speed of molecules of molar mass M?', 'v_rms = √(3RT/M), with temperature in kelvin.'],
        ['Degrees of freedom and equipartition', 'What is the average energy per molecule for f active quadratic degrees of freedom?', '〈E〉 = (f/2)k_BT; hence U = (f/2)nRT for an ideal gas.'],
        ['Mean free path', 'What happens to mean free path when number density increases?', 'It decreases; for hard spheres λ = 1/(√2 πd²n).'],
        ['Kinetic interpretation of pressure', 'What microscopic quantity creates gas pressure on container walls?', 'Molecular momentum transfer during collisions with the walls.'],
        ['Specific heats of gases', 'For an ideal gas, what is C_p−C_v per mole?', 'R, Mayer’s relation.']
      ]),
      chapter('Oscillations', 'Oscillations and Waves', [
        ['Simple harmonic motion', 'What is the defining equation of SHM?', 'a = −ω²x; displacement can be written x = A cos(ωt + φ).'],
        ['Spring and simple pendulum', 'What are the ideal periods for a spring–mass system and a small-angle pendulum?', 'T_spring = 2π√(m/k); T_pendulum = 2π√(L/g).'],
        ['Progressive and standing waves', 'What is the wave speed on a stretched string?', 'v = √(T/μ), where T is string tension and μ is mass per unit length.'],
        ['Organ pipes and beats', 'What is the beat frequency for two close frequencies?', 'f_beat = |f₁ − f₂|. A pipe closed at one end supports odd harmonics only.'],
        ['Phase and periodic functions', 'How is angular frequency related to period?', 'ω = 2π/T = 2πf. Phase specifies the state of an oscillator within its cycle.'],
        ['Energy in SHM', 'How does total energy in ideal spring SHM depend on amplitude?', 'E = ½kA²; it is constant while kinetic and potential energies exchange.'],
        ['Superposition and standing waves', 'What is a node in a standing wave?', 'A point of zero displacement amplitude; adjacent nodes are separated by λ/2.']
      ]),
      chapter('Electromagnetism', 'Electrostatics', [
        ['Coulomb’s law and electric field', 'What is the field of a point charge q at distance r?', 'E⃗ = (1/4πε₀)(q/r²) r̂. Fields from multiple charges add by superposition.'],
        ['Electric flux and Gauss’s law', 'State Gauss’s law.', '∮E⃗·dA⃗ = Q_enclosed/ε₀. Choose symmetry so E is constant over the Gaussian surface.'],
        ['Potential and conductors', 'How are electric field and potential related?', 'E⃗ = −∇V; in electrostatic equilibrium, the field inside a conductor is zero.'],
        ['Capacitance and dielectrics', 'What is the capacitance of a parallel-plate capacitor?', 'C = εA/d; inserting a dielectric of relative permittivity κ gives C = κε₀A/d.'],
        ['Capacitor energy', 'How much energy is stored in a capacitor?', 'U = ½CV² = Q²/(2C) = ½QV.'],
        ['Charge conservation and quantisation', 'What does quantisation of charge mean?', 'Net charge occurs in integral multiples of the elementary charge: q = ne. Total charge is conserved.'],
        ['Conductors, insulators and charging', 'What is electrostatic shielding?', 'A closed conductor in electrostatic equilibrium has zero electric field in its material; external fields are screened from its cavity.'],
        ['Superposition for point charges', 'How do you find the net electric field from several charges?', 'Add each charge’s electric-field vector at the point; do not add magnitudes unless directions agree.'],
        ['Electric field lines', 'Can two electric-field lines cross?', 'No. Crossing would assign two different field directions at one point. Lines start on positive charge and end on negative charge or infinity.'],
        ['Electric dipoles', 'What is the dipole moment of charges ±q separated by vector d⃗ from −q to +q?', 'p⃗ = qd⃗; in a uniform field the torque is p⃗×E⃗.'],
        ['Continuous charge distributions', 'How is the field of a continuous charge distribution assembled?', 'Integrate Coulomb’s law over the distribution: dE⃗ = (1/4πε₀)(dq/r²) r̂.'],
        ['Gauss law: spherical symmetry', 'What field does a uniformly charged thin spherical shell produce outside?', 'The same as a point charge Q at its centre: E = Q/(4πε₀r²). Inside the shell E=0.'],
        ['Gauss law: line and plane symmetry', 'What are the fields of an infinite line charge λ and an infinite sheet σ?', 'E_line = λ/(2πε₀r); E_sheet = σ/(2ε₀) on either side of a nonconducting sheet.'],
        ['Electrostatic potential and potential energy', 'What is the potential energy of two point charges?', 'U = (1/4πε₀)q₁q₂/r, taking zero at infinite separation.'],
        ['Equipotential surfaces', 'Why is no work done moving a charge along an equipotential surface?', 'The potential difference is zero, so W = qΔV = 0; the electric field is perpendicular to the surface.'],
        ['Series and parallel capacitors', 'How do equivalent capacitances combine?', 'Parallel: C_eq = ΣCᵢ. Series: 1/C_eq = Σ(1/Cᵢ).']
      ]),
      chapter('Electromagnetism', 'Current Electricity', [
        ['Current, drift and Ohm’s law', 'How is drift speed related to current?', 'I = neAv_d for carrier density n, charge e and area A.'],
        ['Resistance and power', 'What is electrical power in a resistor?', 'P = VI = I²R = V²/R. Series resistances add; parallel conductances add.'],
        ['Cells and internal resistance', 'What is terminal voltage while a cell supplies current?', 'V = E − Ir, where E is emf and r is internal resistance.'],
        ['Kirchhoff laws and bridges', 'What balance condition holds for a Wheatstone bridge?', 'P/Q = R/S; at balance, no current flows through the galvanometer branch.'],
        ['Current density and mobility', 'What is the relation between current density and drift velocity?', 'J⃗ = nqv⃗_d for charge carriers of signed charge q; mobility is drift speed per unit electric field.'],
        ['Resistivity and conductivity', 'How are resistance and resistivity related for a uniform wire?', 'R = ρL/A; conductivity σ = 1/ρ.'],
        ['Temperature dependence and I–V curves', 'What distinguishes an ohmic conductor?', 'At fixed physical conditions, its I–V graph is linear through the origin and its resistance is constant.'],
        ['Cells in series and parallel', 'For identical cells, what is the equivalent emf of n cells in series aiding?', 'nE, with total internal resistance nr; parallel identical cells have emf E and internal resistance r/n.'],
        ['Metre bridge', 'What principle does a metre bridge use?', 'Wheatstone-bridge balance; for uniform wire, resistance ratios equal the corresponding balancing-length ratios.']
      ]),
      chapter('Electromagnetism', 'Magnetic Effects of Current and Magnetism', [
        ['Biot–Savart and Ampère laws', 'What is the magnetic field at the centre of an N-turn circular coil?', 'B = μ₀NI/(2R). Ampère’s law: ∮B⃗·dl⃗ = μ₀I_enclosed.'],
        ['Lorentz force and charged-particle motion', 'What is the magnetic force on a moving charge?', 'F⃗ = q(v⃗×B⃗); for v ⟂ B, the path radius is mv/(|q|B).'],
        ['Current loops and galvanometers', 'What torque acts on a current loop in a uniform magnetic field?', 'τ⃗ = μ⃗×B⃗, with magnetic moment μ⃗ = NIA n̂.'],
        ['Magnets and magnetic materials', 'How do dia-, para- and ferromagnetic materials respond to a field?', 'Diamagnetic materials weakly oppose it; paramagnetic weakly align; ferromagnetic strongly align and may retain magnetisation.'],
        ['Magnetic field of a straight wire and solenoid', 'What is the field inside a long ideal solenoid?', 'B ≈ μ₀nI, where n is turns per unit length; outside it is approximately zero.'],
        ['Force between parallel currents', 'Do parallel currents in the same direction attract or repel?', 'They attract; opposite-direction currents repel.'],
        ['Magnetic dipole and bar magnet', 'What torque acts on a magnetic dipole in a uniform field?', 'τ⃗ = μ⃗×B⃗; its potential energy is U = −μ⃗·B⃗.'],
        ['Magnetisation and magnetic intensity', 'What is magnetic susceptibility?', 'χ_m = M/H in a linear material, relating magnetisation M to magnetic field intensity H.']
      ]),
      chapter('Electromagnetism', 'Electromagnetic Induction and Alternating Currents', [
        ['Faraday and Lenz laws', 'What determines the induced emf?', 'ε = −dΦ_B/dt; the minus sign expresses Lenz’s law, opposing the flux change.'],
        ['Self and mutual inductance', 'What is the energy stored in an inductor?', 'U = ½LI². Induced emf in a coil is ε = −L(dI/dt).'],
        ['AC and impedance', 'What is the impedance of a series LCR circuit?', 'Z = √(R² + (X_L−X_C)²), where X_L = ωL and X_C = 1/(ωC).'],
        ['Resonance, transformers and power', 'What is the resonance angular frequency of an ideal LCR circuit?', 'ω₀ = 1/√(LC). An ideal transformer has V_s/V_p = N_s/N_p.'],
        ['Magnetic flux and induced emf', 'What is magnetic flux through a flat area in a uniform field?', 'Φ_B = BA cos θ, where θ is between B⃗ and the area normal.'],
        ['Motional emf', 'What emf is induced across a rod of length ℓ moving perpendicular to B at speed v?', 'ε = Bℓv when the rod, velocity and field have the standard mutually perpendicular geometry.'],
        ['Peak, RMS and phasors', 'For a sinusoidal current, how is RMS current related to peak current?', 'I_rms = I₀/√2. Phasors encode the phase relation between sinusoidal quantities.'],
        ['Inductive and capacitive reactance', 'How do reactances vary with angular frequency?', 'X_L = ωL increases with frequency; X_C = 1/(ωC) decreases.'],
        ['Power factor and wattless current', 'What is average power in a sinusoidal AC circuit?', 'P_avg = V_rms I_rms cos φ; cos φ is the power factor.']
      ]),
      chapter('Electromagnetism', 'Electromagnetic Waves', [
        ['Displacement current', 'Why did Maxwell introduce displacement current?', 'A changing electric field contributes to magnetic circulation, completing Ampère’s law for time-varying fields.'],
        ['Wave speed and transverse nature', 'What is the speed of an electromagnetic wave in vacuum?', 'c = 1/√(μ₀ε₀); electric and magnetic fields are transverse and mutually perpendicular.'],
        ['Electromagnetic spectrum', 'Order the spectrum from lowest to highest frequency.', 'Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma ray. Frequency and photon energy rise in this order.']
      ]),
      chapter('Optics', 'Optics', [
        ['Mirrors, refraction and lenses', 'What is the thin-lens formula using Cartesian signs?', '1/f = 1/v − 1/u. Lens power in dioptres is P = 1/f when f is in metres.'],
        ['Prisms and optical instruments', 'What is the approximate angular magnification of a telescope in normal adjustment?', 'M = f_objective/f_eyepiece in magnitude.'],
        ['Wavefronts and interference', 'What is Young’s double-slit fringe width?', 'β = λD/d for slit separation d and screen distance D.'],
        ['Diffraction and polarisation', 'What is the condition for the first single-slit diffraction minimum?', 'a sin θ = λ; polarisation demonstrates that light is transverse.'],
        ['Spherical mirrors', 'What is the mirror equation?', '1/f = 1/v + 1/u under the Cartesian sign convention; f=R/2 for a spherical mirror.'],
        ['Refraction and total internal reflection', 'When does total internal reflection occur?', 'Light travels from higher to lower refractive index and the incidence angle exceeds the critical angle.'],
        ['Prisms and dispersion', 'What is the deviation at minimum deviation for a prism of angle A?', 'n = sin[(A+δ_min)/2] / sin(A/2).'],
        ['Microscopes and telescopes', 'What sets the angular magnification of a simple magnifier?', 'It is the ratio of the angle subtended at the eye with the instrument to that without it.'],
        ['Huygens principle and wavefronts', 'What is a wavefront?', 'A surface of equal phase; each point can be treated as a source of secondary wavelets.'],
        ['Young’s double-slit interference', 'What path difference produces a bright fringe?', 'An integral multiple of wavelength: Δ = mλ.']
      ]),
      chapter('Modern Physics', 'Dual Nature of Matter and Radiation', [
        ['Photoelectric effect', 'What is Einstein’s photoelectric equation?', 'K_max = hν − φ = eV_stop; emission requires ν ≥ φ/h.'],
        ['Matter waves', 'What is the de Broglie wavelength of a particle?', 'λ = h/p; for a non-relativistic particle accelerated through V, λ = h/√(2mqV).'],
        ['Threshold frequency and work function', 'What is threshold frequency?', 'The minimum frequency required for photoemission; φ = hν₀.'],
        ['Photoelectric observations', 'What sets the maximum kinetic energy of emitted photoelectrons?', 'The light frequency, not its intensity; intensity mainly changes the number emitted when above threshold.'],
        ['Photon momentum', 'What is the momentum of a photon of wavelength λ?', 'p = h/λ = E/c.']
      ]),
      chapter('Modern Physics', 'Atoms and Nuclei', [
        ['Rutherford and Bohr models', 'What is the Bohr energy of hydrogen at principal quantum number n?', 'E_n = −13.6/n² eV. Photon energy equals the difference between levels.'],
        ['Nuclear size and mass defect', 'How is nuclear binding energy related to mass defect?', 'B = Δmc²; nuclear radius is approximately R = R₀A^(1/3).'],
        ['Fission and fusion', 'Why can fission or fusion release energy?', 'Products move toward greater binding energy per nucleon; the mass difference is released as energy.'],
        ['Hydrogen spectrum and transitions', 'What photon energy accompanies a transition between atomic levels?', 'The photon energy is the magnitude of the level difference: hν = |E_i−E_f|.'],
        ['Binding energy per nucleon', 'What does a larger binding energy per nucleon generally indicate?', 'A more tightly bound, more stable nucleus.'],
        ['Mass–energy equivalence', 'What physical principle relates nuclear mass change to released energy?', 'Mass–energy equivalence: ΔE = Δmc².']
      ]),
      chapter('Modern Physics', 'Electronic Devices', [
        ['Semiconductors and p–n junctions', 'What happens to the depletion region in forward bias?', 'It narrows, lowering the junction barrier and allowing substantial current.'],
        ['Diodes and optoelectronic devices', 'What does a Zener diode do in reverse breakdown?', 'It maintains an approximately constant voltage, so it can regulate a supply.'],
        ['Logic gates', 'What is the output of a NAND gate?', 'Y = ¬(A·B); it is zero only when both inputs are one.'],
        ['Rectifiers and diode bias', 'What does a rectifier do?', 'It converts alternating input into unidirectional (pulsating DC) output using diode conduction.'],
        ['LEDs, photodiodes and solar cells', 'How does a solar cell produce current?', 'A p–n junction’s built-in field separates photo-generated electron–hole pairs.'],
        ['Zener voltage regulation', 'In which bias direction is a Zener diode normally used for regulation?', 'Reverse bias in its breakdown region, with a series resistor limiting current.']
      ]),
      chapter('Practical Physics', 'Experimental Skills', [
        ['Measurement instruments', 'How is least count used in a vernier measurement?', 'Read the main scale, then add (coinciding vernier division × least count), applying zero correction.'],
        ['Graph-based experiments', 'Why plot a graph in an experiment?', 'The slope or intercept can estimate a physical parameter and reveal whether the measured relation is linear.'],
        ['Electrical and optical experiments', 'What is the key idea behind a metre-bridge measurement?', 'At balance, the Wheatstone-bridge ratio matches the ratio of wire lengths, allowing an unknown resistance to be found.']
      ])
    ],
    chemistry: [
      chapter('Physical Chemistry', 'Some Basic Concepts in Chemistry', [
        ['Mole concept and molar mass', 'How many entities are in one mole?', 'Avogadro’s constant, N_A ≈ 6.022 × 10²³ mol⁻¹; n = mass/molar mass.'],
        ['Chemical laws and formulae', 'How do empirical and molecular formulae relate?', 'Molecular formula = (empirical formula) × n, where n = molar mass / empirical-formula mass.'],
        ['Stoichiometry and limiting reagent', 'What determines the limiting reagent?', 'The reactant with the smallest available amount divided by its balanced-equation coefficient is consumed first.'],
        ['Laws of chemical combination', 'What does the law of conservation of mass state?', 'In a chemical reaction, total mass is conserved; atoms are rearranged rather than created or destroyed.'],
        ['Atomic and molecular mass', 'What is one atomic mass unit?', 'One unified atomic mass unit is one twelfth of the mass of a carbon-12 atom.'],
        ['Percentage composition', 'How is the mass percentage of an element calculated?', '% element = (mass of that element in one mole of compound / molar mass of compound) × 100.'],
        ['Balanced equations and mole ratios', 'Where do stoichiometric mole ratios come from?', 'They are the coefficients in the balanced chemical equation, interpreted as relative numbers of particles or moles.']
      ]),
      chapter('Physical Chemistry', 'Atomic Structure', [
        ['Electromagnetic radiation and spectra', 'What relation connects photon energy and frequency?', 'E = hν = hc/λ.'],
        ['Bohr model', 'What is the radius of the nth Bohr orbit for a hydrogen-like ion?', 'r_n = a₀n²/Z; its energy is E_n = −13.6Z²/n² eV.'],
        ['Quantum numbers and orbitals', 'What values can the azimuthal quantum number l take?', 'For principal quantum number n, l = 0, 1, …, n−1; each subshell has 2l+1 orbitals.'],
        ['Electronic configuration', 'State the Pauli exclusion principle.', 'No two electrons in an atom have the same four quantum numbers; an orbital holds at most two with opposite spins.'],
        ['Subatomic particles and isotopes', 'What distinguishes isotopes of an element?', 'They have the same proton number but different neutron numbers and mass numbers.'],
        ['Atomic models and their limits', 'What key feature did Rutherford’s model establish?', 'A small, dense, positively charged nucleus; it could not explain atomic stability or line spectra.'],
        ['de Broglie wavelength and uncertainty', 'State the de Broglie relation.', 'λ = h/p. Heisenberg’s principle gives ΔxΔp ≥ ħ/2.'],
        ['Shapes of s, p and d orbitals', 'How many orbitals are in a p subshell?', 'Three, corresponding to m_l = −1, 0, +1; a p subshell holds at most six electrons.'],
        ['Aufbau and Hund rules', 'What does Hund’s rule predict for degenerate orbitals?', 'Electrons occupy them singly with parallel spins before pairing, giving the lowest-energy arrangement.']
      ]),
      chapter('Physical Chemistry', 'Chemical Bonding and Molecular Structure', [
        ['Ionic and covalent bonding', 'What is lattice enthalpy?', 'It measures the enthalpy change associated with forming an ionic solid from gaseous ions (sign depends on convention).'],
        ['VSEPR and molecular shape', 'What shape does a central atom with four bonding pairs and no lone pairs have?', 'Tetrahedral, with ideal bond angles about 109.5°.'],
        ['Hybridisation and resonance', 'What is the hybridisation of carbon in methane?', 'sp³; four equivalent hybrid orbitals form a tetrahedral arrangement.'],
        ['Molecular orbital theory', 'What is bond order in molecular orbital theory?', 'Bond order = ½(N_bonding − N_antibonding); a larger positive value generally means a stronger, shorter bond.'],
        ['Hydrogen and metallic bonding', 'When is hydrogen bonding especially strong?', 'When H is covalently bonded to a small, highly electronegative atom such as N, O or F.'],
        ['Lewis structures and formal charge', 'How is formal charge calculated?', 'Formal charge = valence electrons − nonbonding electrons − ½(bonding electrons).'],
        ['Bond length, strength and polarity', 'What is dipole moment for separated charges?', 'μ⃗ = qd⃗; bond polarity depends on electronegativity difference and molecular geometry.'],
        ['Valence-bond theory and hybridisation', 'What hybridisation gives a linear arrangement?', 'sp hybridisation, with an ideal angle of 180°.'],
        ['Molecular orbital configurations', 'How is bond order found from a molecular orbital diagram?', 'Bond order = ½(bonding electrons − antibonding electrons).'],
        ['Resonance and electron delocalisation', 'What does a resonance hybrid represent?', 'One delocalised structure; contributing canonical forms are not rapidly interconverting molecules.']
      ]),
      chapter('Physical Chemistry', 'Chemical Thermodynamics', [
        ['System, state functions and heat', 'Which are state functions: heat, work, internal energy?', 'Internal energy is a state function; heat and work depend on the path.'],
        ['First law and enthalpy', 'At constant pressure, what equals the heat exchanged for a process?', 'q_p = ΔH, provided only pressure–volume work occurs.'],
        ['Entropy and spontaneity', 'What is the Gibbs-energy criterion at constant T and P?', 'ΔG < 0 is spontaneous; ΔG = 0 at equilibrium.'],
        ['Gibbs energy and equilibrium', 'How is standard Gibbs energy related to the equilibrium constant?', 'ΔG° = −RT ln K.'],
        ['Heat, work and sign convention', 'Using chemistry’s usual convention, what is the first law?', 'ΔU = q + w, where q is heat absorbed by the system and w is work done on it.'],
        ['Enthalpy and heat capacities', 'Define enthalpy.', 'H = U + PV; at constant pressure, ΔH equals heat exchanged when only pressure–volume work occurs.'],
        ['Hess’s law and reaction enthalpy', 'Why can Hess’s law combine reaction steps?', 'Enthalpy is a state function, so the total ΔH depends only on initial and final states.'],
        ['Entropy and the second law', 'What is the entropy change for a reversible heat transfer?', 'dS = δq_rev/T; entropy is a state function.']
      ]),
      chapter('Physical Chemistry', 'Solutions', [
        ['Concentration units', 'Define molality.', 'Molality = moles of solute per kilogram of solvent; unlike molarity, it is independent of temperature-related volume changes.'],
        ['Raoult’s law', 'What is Raoult’s law for an ideal solution?', 'Partial vapour pressure pᵢ = xᵢpᵢ°; total pressure is the sum of partial pressures.'],
        ['Colligative properties', 'What determines a colligative property?', 'The number of dissolved particles, not their chemical identity; examples include boiling-point elevation and osmotic pressure.'],
        ['van’t Hoff factor', 'Why use the van’t Hoff factor i?', 'It corrects colligative-property calculations for solute association or dissociation.'],
        ['Henry’s law', 'What does Henry’s law relate for a dilute gas solution?', 'At fixed temperature, gas partial pressure is proportional to its mole fraction in solution: p = K_Hx.'],
        ['Ideal and non-ideal solutions', 'What defines an ideal solution?', 'It obeys Raoult’s law over the full composition range; mixing has ΔH_mix=0 and ΔV_mix=0.'],
        ['Freezing and boiling changes', 'What is the relation for boiling-point elevation?', 'ΔT_b = iK_bm for a dilute solution.'],
        ['Osmotic pressure', 'What equation gives osmotic pressure for a dilute solution?', 'π = iCRT = i(n/V)RT.']
      ]),
      chapter('Physical Chemistry', 'Equilibrium', [
        ['Dynamic equilibrium and K', 'What is true at dynamic equilibrium?', 'Forward and reverse rates are equal; concentrations are constant, though reactions continue microscopically.'],
        ['Le Chatelier principle', 'How does an equilibrium respond to adding a reactant?', 'It shifts in the direction that consumes some of the added reactant.'],
        ['Acids, bases and pH', 'What is pH?', 'pH = −log₁₀[H⁺] for the usual dilute aqueous approximation.'],
        ['Buffers, hydrolysis and solubility', 'What is the Henderson–Hasselbalch form for an acidic buffer?', 'pH = pK_a + log([A⁻]/[HA]).'],
        ['Equilibrium constants Kc and Kp', 'For gaseous equilibria, how are Kp and Kc related?', 'K_p = K_c(RT)^Δn_g, where Δn_g is gaseous product moles minus gaseous reactant moles.'],
        ['Reaction quotient and direction', 'How does Q compare with K to predict reaction direction?', 'If Q<K the forward reaction proceeds; if Q>K it proceeds in reverse; Q=K at equilibrium.'],
        ['Degree of ionisation and weak electrolytes', 'What happens to the degree of ionisation of a weak electrolyte on dilution?', 'It increases; for a weak acid, K_a ≈ Cα² when α is small.'],
        ['Salt hydrolysis', 'What determines whether an aqueous salt solution is acidic or basic?', 'The acid–base strengths of its parent acid and base and whether its ions hydrolyse.'],
        ['Solubility product and common-ion effect', 'When does precipitation begin using ionic product Q_sp?', 'When Q_sp exceeds K_sp; a common ion generally lowers the salt’s solubility.']
      ]),
      chapter('Physical Chemistry', 'Redox Reactions and Electrochemistry', [
        ['Oxidation number and balancing', 'In a redox reaction, what happens to oxidation number?', 'Oxidation increases oxidation number; reduction decreases it. Electron loss and gain must balance.'],
        ['Conductance and Kohlrausch law', 'What is molar conductivity?', 'Λ_m = κ/c when concentration units are consistent; it generally rises on dilution for electrolytes.'],
        ['Galvanic cells and Nernst equation', 'How is cell emf related to Gibbs energy?', 'ΔG = −nFE_cell; at 298 K, E = E° − (0.0591/n)log Q.'],
        ['Batteries and fuel cells', 'What energy conversion occurs in a galvanic cell?', 'Spontaneous chemical energy is converted to electrical energy.']
      ]),
      chapter('Physical Chemistry', 'Chemical Kinetics', [
        ['Rate law and reaction order', 'How is reaction order determined?', 'From the experimentally measured rate law; it need not equal the stoichiometric coefficient.'],
        ['Zero- and first-order kinetics', 'What is the half-life of a first-order reaction?', 't₁/₂ = 0.693/k, independent of initial concentration.'],
        ['Arrhenius equation', 'How does the rate constant depend on temperature?', 'k = Ae^(−E_a/RT); a plot of ln k versus 1/T has slope −E_a/R.'],
        ['Collision theory', 'What makes a molecular collision effective?', 'The molecules must collide with sufficient energy to overcome E_a and with suitable orientation.']
      ]),
      chapter('Inorganic Chemistry', 'Classification of Elements and Periodicity in Properties', [
        ['Periodic table and blocks', 'What determines an element’s s, p, d or f block?', 'The subshell into which the differentiating electron enters.'],
        ['Periodic trends', 'How does atomic radius generally change across a period?', 'It generally decreases from left to right as effective nuclear charge increases.'],
        ['Ionisation enthalpy and electron gain', 'What is first ionisation enthalpy?', 'The enthalpy needed to remove the most loosely held electron from one mole of isolated gaseous atoms.'],
        ['Valency and oxidation states', 'Why do transition elements show variable oxidation states?', 'The ns and (n−1)d orbitals have comparable energies and can both participate in bonding.'],
        ['Modern periodic law', 'State the modern periodic law.', 'The properties of elements are periodic functions of their atomic numbers.'],
        ['Ionic size and isoelectronic series', 'In an isoelectronic series, how does ionic radius vary with nuclear charge?', 'It decreases as nuclear charge increases, because the same electron cloud is attracted more strongly.'],
        ['Electronegativity and chemical reactivity', 'What does electronegativity describe?', 'An atom’s relative tendency to attract shared electron density in a chemical bond.']
      ]),
      chapter('Inorganic Chemistry', 'p-Block Elements', [
        ['Groups 13–14 trends', 'Why does the first element of a p-block group often differ from its heavier members?', 'Its small size, higher electronegativity and absence of vacant d orbitals produce distinctive bonding.'],
        ['Groups 15–16 trends', 'What is the inert-pair effect?', 'The tendency of the outer ns² pair to remain non-bonding, stabilising oxidation states two lower in heavier p-block elements.'],
        ['Groups 17–18 and compounds', 'Why are noble gases generally unreactive?', 'They have closed valence shells and high ionisation enthalpies, though heavier members can form compounds.'],
        ['Group 13: boron family', 'Why is boron anomalous in Group 13?', 'Its small size, high ionisation enthalpy and absence of d orbitals distinguish it from heavier members.'],
        ['Group 14: carbon family', 'What is catenation?', 'The ability of an element to form covalent bonds with itself, producing chains or rings.'],
        ['Group 15: nitrogen family', 'Why is the +5 oxidation state less stable down Group 15?', 'The inert-pair effect increasingly stabilises the +3 state in heavier members.'],
        ['Group 16: chalcogens', 'What is the common valence-shell configuration of Group 16 elements?', 'ns²np⁴, giving six valence electrons.'],
        ['Group 17: halogens', 'Why are halogens strong oxidising agents?', 'They readily gain one electron to complete the valence shell; oxidising strength generally decreases down the group.'],
        ['Group 18: noble gases', 'How does boiling point generally change down the noble-gas group?', 'It rises as larger electron clouds are more polarisable and London dispersion forces strengthen.']
      ]),
      chapter('Inorganic Chemistry', 'd- and f-Block Elements', [
        ['Transition-element properties', 'Why are many transition-metal ions coloured?', 'Partially filled d orbitals permit electronic transitions that absorb visible light.'],
        ['KMnO₄ and K₂Cr₂O₇', 'What happens to permanganate in acidic medium?', 'MnO₄⁻ is a strong oxidising agent and is reduced to Mn²⁺.'],
        ['Lanthanoids and actinoids', 'What causes lanthanoid contraction?', 'Poor shielding by 4f electrons causes a gradual increase in effective nuclear attraction across the series.'],
        ['Electronic configuration and oxidation states', 'Why can transition metals show several oxidation states?', 'The energies of ns and (n−1)d electrons are close enough for different numbers to participate in bonding.'],
        ['Magnetic and catalytic behaviour', 'What causes paramagnetism in a transition-metal ion?', 'One or more unpaired electrons.'],
        ['Lanthanoid and actinoid comparison', 'Which subshell is filled across the lanthanoid series?', 'The 4f subshell; actinoids fill the 5f subshell.']
      ]),
      chapter('Inorganic Chemistry', 'Coordination Compounds', [
        ['Ligands and nomenclature', 'What is coordination number?', 'The number of donor atoms directly bonded to the central metal; it may differ from the number of ligands.'],
        ['Isomerism', 'What is linkage isomerism?', 'A ligand binds through different donor atoms, as with ambidentate ligands such as NO₂⁻.'],
        ['Bonding and crystal field theory', 'Why can coordination compounds be coloured?', 'Ligand fields split metal d-orbital energies; absorption between levels can fall in visible light.'],
        ['Magnetism and applications', 'How do unpaired electrons affect magnetic behaviour?', 'They produce paramagnetism; a complex with all electrons paired is diamagnetic.'],
        ['Werner theory and coordination sphere', 'What is the coordination sphere?', 'The central metal and its directly attached ligands, commonly written inside square brackets.'],
        ['IUPAC nomenclature', 'In naming a coordination entity, how are ligands ordered?', 'Ligand names are listed alphabetically, followed by the metal name and its oxidation state.'],
        ['Geometrical and optical isomerism', 'What is geometrical isomerism in a coordination compound?', 'Different spatial arrangements, such as cis/trans, with the same bonds and composition.']
      ]),
      chapter('Organic Chemistry', 'Purification and Characterisation of Organic Compounds', [
        ['Crystallisation, distillation and extraction', 'What property enables fractional distillation?', 'Components have different boiling points and repeatedly vaporise/condense in a fractionating column.'],
        ['Chromatography', 'What separates components in chromatography?', 'Different partition or adsorption between stationary and mobile phases gives different migration rates.'],
        ['Elemental and quantitative analysis', 'How is an empirical formula obtained from percentage composition?', 'Convert each element’s mass percentage to moles, then divide all mole amounts by the smallest.'],
        ['Sublimation and differential extraction', 'Which property enables sublimation as a purification method?', 'One solid component vaporises directly on heating and deposits on cooling, leaving non-subliming impurities behind.'],
        ['Detection of nitrogen, sulphur and halogens', 'Why is sodium fusion used before testing organic compounds for extra elements?', 'It converts covalently bound elements into water-soluble ionic sodium salts for qualitative tests.'],
        ['Quantitative elemental estimation', 'What does combustion analysis commonly determine?', 'Carbon and hydrogen amounts from the CO₂ and H₂O formed; other procedures estimate N, S, halogens and P.']
      ]),
      chapter('Organic Chemistry', 'Some Basic Principles of Organic Chemistry', [
        ['Hybridisation and functional groups', 'What geometry is associated with sp² carbon?', 'Trigonal planar, with bond angles near 120°.'],
        ['Isomerism and nomenclature', 'How do structural and stereoisomers differ?', 'Structural isomers have different connectivity; stereoisomers have the same connectivity but different spatial arrangement.'],
        ['Electronic effects and intermediates', 'Which is more stable: a tertiary or primary carbocation?', 'Usually tertiary, because alkyl groups stabilise positive charge by inductive effect and hyperconjugation.'],
        ['Reaction types and reagents', 'What is a nucleophile?', 'An electron-pair donor that forms a bond to an electron-deficient centre.'],
        ['IUPAC nomenclature and functional groups', 'What is the role of a principal functional group in IUPAC naming?', 'It determines the suffix and usually receives the lowest possible locant, subject to nomenclature rules.'],
        ['Inductive and electromeric effects', 'What is the inductive effect?', 'A permanent displacement of σ-electron density through bonds due to electronegativity differences.'],
        ['Homolytic and heterolytic bond fission', 'What species form in homolytic bond cleavage?', 'Two radicals, each taking one electron from the broken covalent bond.'],
        ['Electrophiles and nucleophiles', 'What is an electrophile?', 'An electron-pair acceptor that reacts with an electron-rich site.'],
        ['Addition, substitution, elimination and rearrangement', 'What is an elimination reaction?', 'A reaction that removes atoms or groups, often forming a multiple bond.']
      ]),
      chapter('Organic Chemistry', 'Hydrocarbons', [
        ['Alkanes and conformations', 'Which staggered conformation of ethane is more stable?', 'Staggered is more stable than eclipsed because torsional strain is lower.'],
        ['Alkenes and addition reactions', 'What is Markovnikov addition of HX to an unsymmetrical alkene?', 'H adds to the carbon already bearing more H atoms; X ends up on the more substituted carbon (usual ionic conditions).'],
        ['Alkynes and acidity', 'Why are terminal alkynes more acidic than alkenes?', 'Their conjugate-base carbon is sp-hybridised with greater s-character, stabilising negative charge.'],
        ['Aromaticity and substitution', 'What conditions make a cyclic conjugated system aromatic?', 'It is cyclic, planar, fully conjugated and has (4n+2) π electrons.'],
        ['Preparation and properties of hydrocarbons', 'How are alkanes commonly prepared by hydrogenation?', 'An unsaturated hydrocarbon adds H₂ over a suitable catalyst to form a more saturated product.'],
        ['Alkene stereochemistry and ozonolysis', 'What does ozonolysis of an alkene do?', 'It cleaves the C=C bond and forms carbonyl fragments after work-up.'],
        ['Alkyne reactions and polymerisation', 'What is the characteristic acidity of a terminal alkyne due to?', 'The sp-hybridised carbon stabilises its conjugate base through high s-character.'],
        ['Electrophilic aromatic substitution', 'Why does benzene favour substitution over addition?', 'Substitution preserves the aromatic π system; addition would destroy aromatic stabilisation.']
      ]),
      chapter('Organic Chemistry', 'Organic Compounds Containing Halogens', [
        ['C–X bond and preparation', 'Why are many alkyl halides polar?', 'The C–X bond is polar because halogen and carbon have different electronegativities.'],
        ['Substitution mechanisms', 'What is the key kinetic difference between S_N1 and S_N2?', 'S_N1 is first order in substrate; S_N2 is second order and occurs in one concerted step.'],
        ['Uses and environmental effects', 'Why were many CFCs restricted?', 'They release chlorine radicals in the stratosphere that catalytically deplete ozone.']
      ]),
      chapter('Organic Chemistry', 'Organic Compounds Containing Oxygen', [
        ['Alcohols and dehydration', 'How does alcohol dehydration usually form an alkene?', 'Acid and heat promote elimination of water; mechanism and regioselectivity depend on the alcohol structure.'],
        ['Phenols and ethers', 'Why is phenol more acidic than a typical alcohol?', 'Its conjugate base is resonance-stabilised over the aromatic ring.'],
        ['Aldehydes and ketones', 'Why do aldehydes generally undergo nucleophilic addition faster than ketones?', 'They are less sterically hindered and have less electron donation to the carbonyl carbon.'],
        ['Carboxylic acids and named reactions', 'What is the key transformation in aldol condensation?', 'Enol/enolate addition forms a β-hydroxy carbonyl, which can dehydrate to an α,β-unsaturated carbonyl.']
      ]),
      chapter('Organic Chemistry', 'Organic Compounds Containing Nitrogen', [
        ['Amines and basicity', 'Why is an amine basic?', 'The nitrogen lone pair accepts a proton; basicity depends on its availability and stabilisation of the conjugate acid.'],
        ['Amines: classification and tests', 'How can primary, secondary and tertiary amines be distinguished conceptually?', 'They contain one, two or three carbon groups bonded to nitrogen, respectively.'],
        ['Diazonium salts', 'Why are aromatic diazonium salts useful in synthesis?', 'They replace the diazonium group with several substituents and can couple to form azo compounds.']
      ]),
      chapter('Organic Chemistry', 'Biomolecules', [
        ['Carbohydrates', 'What are glucose and fructose?', 'Both are monosaccharides with formula C₆H₁₂O₆; glucose is an aldohexose and fructose a ketohexose.'],
        ['Proteins and enzymes', 'What bond joins amino acids in a polypeptide?', 'The peptide (amide) bond, formed between a carboxyl group and an amino group.'],
        ['Vitamins, nucleic acids and hormones', 'What bases are found in DNA?', 'Adenine, thymine, guanine and cytosine; RNA uses uracil instead of thymine.']
      ]),
      chapter('Practical Chemistry', 'Principles Related to Practical Chemistry', [
        ['Qualitative analysis', 'What is the purpose of Lassaigne’s test?', 'Fusion converts covalently bound N, S or halogens into ionic sodium salts that can be tested.'],
        ['Functional-group detection', 'What does 2,4-DNP test detect?', 'Aldehyde or ketone carbonyl groups, typically giving a yellow/orange precipitate.'],
        ['Preparations and titrations', 'What is the equivalence-point condition in an acid–base titration?', 'Stoichiometric amounts have reacted; the indicator endpoint should be close to this point.'],
        ['Salt analysis and experiments', 'Why add a group reagent in qualitative cation analysis?', 'Controlled conditions selectively precipitate a group of cations based on solubility equilibria.']
      ])
    ],
    maths: [
      chapter('Algebra', 'Sets, Relations and Functions', [
        ['Set operations', 'What is De Morgan’s law for sets?', '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ and (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.'],
        ['Relations and equivalence', 'What makes a relation an equivalence relation?', 'It is reflexive, symmetric and transitive.'],
        ['Functions and composition', 'When is a function invertible?', 'When it is bijective (one-to-one and onto) between its stated domain and codomain.'],
        ['Set representation and power sets', 'If a set has n elements, how many elements does its power set have?', '2ⁿ subsets, including the empty set and the set itself.'],
        ['Cartesian products', 'What is A×B?', 'The set of ordered pairs (a,b) with a∈A and b∈B; |A×B|=|A||B| for finite sets.'],
        ['Domain, codomain and range', 'How do range and codomain differ?', 'The range is the set of actual outputs; the codomain is the declared target set and may be larger.'],
        ['One-one, onto and into functions', 'What does onto mean?', 'Every element of the codomain is the image of at least one domain element.'],
        ['Function composition', 'Is function composition generally commutative?', 'No. In general f∘g and g∘f have different domains or values.']
      ]),
      chapter('Algebra', 'Complex Numbers and Quadratic Equations', [
        ['Complex plane and modulus', 'What is the modulus of z = a + ib?', '|z| = √(a²+b²); geometrically it is the distance from the origin in the Argand plane.'],
        ['Roots and coefficients', 'For ax²+bx+c=0, what are the sum and product of roots?', 'α+β = −b/a and αβ = c/a.'],
        ['Nature of roots', 'What does the discriminant tell you for real coefficients?', 'D = b²−4ac: positive gives distinct real roots, zero equal real roots, negative a conjugate pair.'],
        ['Algebra of complex numbers', 'What is i²?', 'i² = −1; powers of i repeat with period four.'],
        ['Conjugates and reciprocals', 'What is z z̄ for z=a+ib?', 'z z̄ = a²+b² = |z|², a non-negative real number.'],
        ['Argument and polar form', 'How is a nonzero complex number written in polar form?', 'z = r(cos θ+i sin θ), where r=|z| and θ is an argument of z.'],
        ['Quadratic equations and root relations', 'When do real-coefficient quadratics have non-real roots?', 'When D<0; the roots are a complex-conjugate pair.']
      ]),
      chapter('Algebra', 'Matrices and Determinants', [
        ['Matrix operations and types', 'When is AB defined for an m×n matrix A?', 'Only when B has n rows; if B is n×p, AB has size m×p.'],
        ['Determinants and area', 'What does det(A)=0 imply for a square matrix?', 'A is singular; its rows/columns are dependent and it has no inverse.'],
        ['Inverse and linear systems', 'When does a square matrix have an inverse?', 'Exactly when its determinant is nonzero; then A⁻¹ = adj(A)/det(A).'],
        ['Transpose and special matrices', 'What defines a symmetric matrix?', 'A square matrix with Aᵀ=A. A skew-symmetric matrix satisfies Aᵀ=−A.'],
        ['Determinant properties', 'What happens to a determinant if two rows are interchanged?', 'Its sign changes. If two rows are equal or proportional, the determinant is zero.'],
        ['Adjoint and inverse', 'What is the adjoint of a square matrix?', 'The transpose of its cofactor matrix; A·adj(A)=det(A)I.'],
        ['Consistency of linear systems', 'When does a square linear system have a unique solution?', 'When its coefficient matrix is nonsingular (determinant nonzero).']
      ]),
      chapter('Algebra', 'Permutations and Combinations', [
        ['Fundamental counting principle', 'If successive choices have m and n options, how many ordered outcomes?', 'mn, provided each choice is independent in the counting setup.'],
        ['Permutations and combinations', 'What is the relation between nPr and nCr?', 'nPr = nCr·r!; permutations count order, combinations do not.'],
        ['Repeated or restricted choices', 'How many distinct arrangements of n objects with repeated groups n₁,n₂,…?', 'n!/(n₁!n₂!…), where the group counts sum to n.']
      ]),
      chapter('Algebra', 'Binomial Theorem and Its Simple Applications', [
        ['Binomial expansion', 'What is the general term in (a+b)ⁿ?', 'T_(r+1) = C(n,r)a^(n−r)b^r for r = 0,…,n.'],
        ['Middle term and coefficients', 'How many middle terms are there in an expansion with an even number of terms?', 'Two middle terms; for odd n, the expansion has one middle term.'],
        ['Approximation and simple applications', 'When is a binomial approximation such as (1+x)^α ≈ 1+αx useful?', 'For |x| ≪ 1, retaining only the leading terms gives a first-order approximation.']
      ]),
      chapter('Algebra', 'Sequence and Series', [
        ['Arithmetic progression', 'What is the nth term of an AP?', 'a_n = a + (n−1)d; the sum is S_n = n/2[2a+(n−1)d].'],
        ['Geometric progression', 'What is the sum of the first n terms of a GP with ratio r ≠ 1?', 'S_n = a(1−rⁿ)/(1−r).'],
        ['Means and AM–GM', 'For positive a,b, what inequality relates AM and GM?', '(a+b)/2 ≥ √(ab), with equality iff a=b.']
      ]),
      chapter('Calculus', 'Limit, Continuity, Differentiability and Applications of Derivatives', [
        ['Limits and standard forms', 'What is lim_(x→0) sin x/x?', '1 when x is measured in radians.'],
        ['Continuity and differentiability', 'What three conditions define continuity at x=a?', 'f(a) is defined, lim_(x→a)f(x) exists, and the limit equals f(a).'],
        ['Derivative rules and composite functions', 'State the chain rule.', 'If y=f(g(x)), then dy/dx = f′(g(x))g′(x).'],
        ['Rates of change and tangents', 'What is the slope of the tangent to y=f(x) at x=a?', 'f′(a).'],
        ['Monotonicity', 'What does f′(x)>0 throughout an interval imply?', 'f is strictly increasing on that interval.'],
        ['Maxima and minima', 'What is a necessary condition for an interior differentiable local extremum?', 'f′(c)=0; this condition alone is not sufficient.'],
        ['Second derivative test and implicit differentiation', 'What do f′(c)=0 and f″(c)<0 indicate?', 'A local maximum at c. For x²+y²=r², implicit differentiation gives dy/dx=−x/y.']
      ]),
      chapter('Calculus', 'Integral Calculus', [
        ['Antiderivatives and standard integrals', 'What is ∫xⁿ dx for n ≠ −1?', 'x^(n+1)/(n+1) + C.'],
        ['Substitution, parts and fractions', 'State integration by parts.', '∫u dv = uv − ∫v du.'],
        ['Definite-integral properties', 'What is ∫_a^b f(x)dx + ∫_b^c f(x)dx?', '∫_a^c f(x)dx.'],
        ['Area under curves', 'How is area between y=f(x) and the x-axis found on [a,b]?', '∫_a^b |f(x)|dx; split at zeros if the sign changes.'],
        ['Fundamental theorem of calculus', 'What does the fundamental theorem connect?', 'Differentiation and integration: if F′=f, then ∫_a^b f(x)dx=F(b)−F(a).'],
        ['Symmetry properties of definite integrals', 'For an odd function on [−a,a], what is its integral?', 'Zero, because positive and negative areas cancel.'],
        ['Area between two curves', 'How is area between y=f(x) and y=g(x) found?', 'Integrate the non-negative difference (upper curve − lower curve) over the interval, splitting where they cross.']
      ]),
      chapter('Calculus', 'Differential Equations', [
        ['Order and degree', 'What is the order of a differential equation?', 'The order of the highest derivative present.'],
        ['Separation of variables', 'How do you solve dy/dx = g(x)h(y) by separation?', 'Write dy/h(y) = g(x)dx, integrate both sides, then apply initial conditions.'],
        ['Linear first-order equations', 'What is the integrating factor for y′+P(x)y=Q(x)?', 'IF = e^(∫P(x)dx); then y·IF = ∫Q·IF dx + C.']
      ]),
      chapter('Coordinate Geometry', 'Coordinate Geometry', [
        ['Cartesian coordinates and distance', 'What is the distance between (x₁,y₁) and (x₂,y₂)?', '√[(x₂−x₁)²+(y₂−y₁)²].'],
        ['Straight lines', 'What condition makes two non-vertical lines perpendicular?', 'm₁m₂ = −1.'],
        ['Circles', 'What is the centre and radius of x²+y²+2gx+2fy+c=0?', 'Centre (−g,−f); radius √(g²+f²−c).'],
        ['Conic sections', 'What is the eccentricity of a parabola?', 'e = 1; ellipses have 0<e<1 and hyperbolas e>1.'],
        ['Section formula and locus', 'What is the internal section formula for ratio m:n?', '((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)) for a point dividing the segment in ratio m:n.'],
        ['Slope and intercept forms', 'What is the slope-intercept form of a line?', 'y=mx+c, where m is the slope and c the y-intercept.'],
        ['Triangle centres', 'How can the centroid be found from three vertex coordinates?', 'It is the coordinate-wise mean of the vertices; the three medians meet there.'],
        ['Standard conic equations', 'What is a standard equation of a parabola opening right?', 'y²=4ax, with focus (a,0) and directrix x=−a.']
      ]),
      chapter('Coordinate Geometry', 'Three Dimensional Geometry', [
        ['Coordinates and direction cosines', 'What relation do direction cosines l,m,n satisfy?', 'l² + m² + n² = 1.'],
        ['Line in space', 'What is a vector form of a line through a⃗ parallel to d⃗?', 'r⃗ = a⃗ + λd⃗.'],
        ['Skew lines and shortest distance', 'What is the shortest distance between non-parallel skew lines with points a⃗,b⃗ and directions d⃗₁,d⃗₂?', '|(b⃗−a⃗)·(d⃗₁×d⃗₂)| / |d⃗₁×d⃗₂|.']
      ]),
      chapter('Vectors', 'Vector Algebra', [
        ['Components and magnitude', 'How is the magnitude of a=(a₁,a₂,a₃) found?', '|a⃗| = √(a₁²+a₂²+a₃²).'],
        ['Scalar product', 'What does a⃗·b⃗ equal?', '|a⃗||b⃗|cos θ; it is zero for perpendicular nonzero vectors.'],
        ['Vector product', 'What is the magnitude of a⃗×b⃗?', '|a⃗||b⃗|sin θ; its direction is perpendicular to both vectors.']
      ]),
      chapter('Statistics and Probability', 'Statistics and Probability', [
        ['Mean, median and mode', 'What is the arithmetic mean of observations xᵢ with frequencies fᵢ?', 'x̄ = Σfᵢxᵢ / Σfᵢ.'],
        ['Variance and standard deviation', 'How are variance and standard deviation related?', 'Standard deviation is the positive square root of variance.'],
        ['Probability theorems', 'For events A and B, what is P(A∪B)?', 'P(A)+P(B)−P(A∩B). If independent, P(A∩B)=P(A)P(B).'],
        ['Bayes and random variables', 'What does Bayes’ theorem calculate?', 'A reverse conditional probability: P(Aᵢ|B)=P(B|Aᵢ)P(Aᵢ)/ΣⱼP(B|Aⱼ)P(Aⱼ).']
      ]),
      chapter('Trigonometry', 'Trigonometry', [
        ['Trigonometric identities', 'State the fundamental identity.', 'sin²x + cos²x = 1.'],
        ['Trigonometric functions and equations', 'What is the period of tan x?', 'π.'],
        ['Inverse trigonometric functions', 'What is the principal-value range of sin⁻¹x?', '[−π/2, π/2].'],
        ['Trigonometric ratios and signs', 'What is tan x in terms of sine and cosine?', 'tan x = sin x/cos x wherever cos x≠0.'],
        ['Compound-angle identities', 'What is sin(A+B)?', 'sin A cos B + cos A sin B.'],
        ['Double-angle identities', 'What is cos 2x?', 'cos 2x = cos²x−sin²x = 1−2sin²x = 2cos²x−1.'],
        ['Trigonometric equations', 'What is the general solution of sin x=0?', 'x=nπ for integer n.'],
        ['Inverse-trigonometric identities', 'Why must principal values be checked when simplifying inverse-trig expressions?', 'Inverse functions return values only in their specified principal ranges; identities can otherwise differ by periods or branches.']
      ])
    ]
  };
})();
