module contract::bondex{
    use std::string::String;


    public struct User has key, store {
        id: UID,
        email: String,
        is_active: bool,
        creation_date: u64,
        last_login_date: u64,
        wallet_id: address
    }

    public struct UserRegistry has key, store{
        id: UID,
        users: vector<User>
    }

    public struct CommunitySavings has store {
        name: String,
        creator: address,
        participants: vector<Savings>,
        total_balance: u64,
        is_active: bool,
        creation_date: u64,
        end_date: u64
    }

    public struct Savings has key, store{
        id: UID,
        creator: address,
        balance: u64

    }

    

    public struct RotationalSavings has key, store {
        id: UID,
        base: CommunitySavings,  
        rotation_period_in_days: u64,
        current_recipient_index: u64,
        contribution_amount_per_cycle: u64,
        total_cycles: u64,
        completed_cycles: u64,
        asset_value: u64
    }

    public struct RotationalSavingsRegistry has key, store {
        id: UID,
        rotational_savings: vector<RotationalSavings>
    }

    public struct CommunityPool has key, store {
        id: UID,
        base: CommunitySavings,           
        goal_amount: u64,
        contributors: vector<Savings>,
        contribution_history: vector<u64>,
        distribution_policy: String,
        amount_per_cycle: u64,
    }

    public struct CommunityPoolRegistry has key, store {
        id: UID,
        community_pools: vector<CommunityPool>
    }

    public struct LeaderboardEntry has copy, drop, store {
        participant: vector<address>,
    }

    public struct LeaderboardSavings has key, store {
        id: UID,
        base: CommunitySavings,
        leaderboard: LeaderboardEntry,
        reward_threshold: u64,
        rewards_pool: u64,
        ranking_date: u64,
        reward_policy: String,
    }

    public struct LeaderboardSavingsRegistry has key, store {
        id: UID,
        leadership: vector<LeaderboardSavings>
    }

    fun init(ctx: &mut TxContext) {
        
        //todo
        let user_registry: vector<User> = vector::empty<User>();
        let rotation_savings_registry = vector::empty<RotationalSavings>();
        let community_pool_registry = vector::empty<CommunityPool>();
        let leaderboard_savings_registry = vector::empty<LeaderboardSavings>();

        let userRegistry = UserRegistry{
            id: object::new(ctx),
            users: user_registry
        };
        let rotationalRegistry = RotationalSavingsRegistry{
            id: object::new(ctx),
            rotational_savings: rotation_savings_registry
        };
        let communityRegistry = CommunityPoolRegistry{
            id: object::new(ctx),
            community_pools: community_pool_registry
        };
        
        let leadershipRegistry = LeaderboardSavingsRegistry{
            id: object::new(ctx),
            leadership: leaderboard_savings_registry
        };

        

        // USER_REGISTRY_ID = borrow_id(&userRegistry);


        transfer::share_object(userRegistry);
        transfer::share_object(rotationalRegistry);
        transfer::share_object(communityRegistry);
        transfer::share_object(leadershipRegistry);



    }   


    // User functions
    #[allow(lint(self_transfer))] 
    public fun register_user(email: String, ctx: &mut TxContext){
        //todo
        // let no = user_registry.users.find_index!(|user| user.email == email);
        // assert!(no.is_none(), 1);

       // let id = ;
        let user = User{
            id:object::new(ctx),
            email,
            is_active: false,
            creation_date: 0,
            last_login_date: 0,
            wallet_id: @0x0
        };

        
        transfer::public_transfer(user, ctx.sender());

        //  let pool_index = vector::length(&user_registry.users);
        // user_registry.users.push_back(user);

        // vector::borrow_mut(&mut user_registry.users, pool_index - 1);
       
    }

    public fun push_user_object_to_registry( userRegistry: &mut UserRegistry, user: User){
        //todo
        userRegistry.users.push_back(user);
    }
    
    #[allow(unused_mut_ref)]
    public fun get_user(email: String, user_registry: &mut UserRegistry): &User {
        //todo
        let mut index: Option<u64> = user_registry.users.find_index!(|user| user.email == email);
        assert!(index.is_some(), 1);
        // Extract the index value safely
        let user_index = option::extract(&mut index);

        // Borrow the user from the vector at the extracted index
        let user = vector::borrow(&mut user_registry.users, user_index);

        user
    }

    public fun get_users(user_registry: &UserRegistry): &vector<User> {
        //todo
        &user_registry.users
    }

    // Rotational Savings functions
    #[allow(lint(self_transfer))]
    public fun create_rotation_savings(name: String, creator: address, rotation_period_in_days: u64, contribution_amount_per_cycle: u64, total_cycles: u64, asset_value: u64, ctx: &mut TxContext) {
        //todo
        assert!(asset_value >= contribution_amount_per_cycle * total_cycles, 1001);
        let mut rotational_savings = RotationalSavings{
            id: object::new(ctx),
            base: CommunitySavings{
                name,
                creator,
                participants: vector::empty<Savings>(),
                total_balance: 0,
                is_active: false,
                creation_date: 0,
                end_date: 0
            },
            rotation_period_in_days,
            current_recipient_index: 0,
            contribution_amount_per_cycle,
            total_cycles,
            completed_cycles: 0,
            asset_value
        };

        let creator_savings = Savings{
            id: object::new(ctx),
            creator,
            balance: 0
        };

        rotational_savings.base.participants.push_back(creator_savings);
        transfer::public_transfer(rotational_savings, ctx.sender());
    }

    #[allow(unused_mut_ref)]
    public fun find_rotation_savings(creator: address, rotational_savings_registry: &mut RotationalSavingsRegistry): &RotationalSavings {
        //todo
        let mut index: Option<u64> = rotational_savings_registry.rotational_savings.find_index!(|rotational_savings| rotational_savings.base.creator == creator);
        assert!(index.is_some(), 1);
        // Extract the index value safely
        let rotational_savings_index = option::extract(&mut index);

        // Borrow the user from the vector at the extracted index
        let rotational_savings = vector::borrow(&mut rotational_savings_registry.rotational_savings, rotational_savings_index);

        rotational_savings
        
    }

    public fun join_rotation_savings(
        creator: address, 
        contributor: address, 
        amount: u64, 
        asset_value: u64,
        rotational_savings_list: &mut vector<RotationalSavings>,
        ctx: &mut TxContext
    ){
        //todo
        let mut rotational_savings = rotational_savings_list.find_index!(|rotational_savings| rotational_savings.base.creator == creator);
        assert!(rotational_savings.is_some(), 1);

        let rotational_savings_index = option::extract(&mut rotational_savings);

        let rotational_savings = vector::borrow_mut( rotational_savings_list, rotational_savings_index);


        let participant_index = rotational_savings.base.participants.find_index!(|participant| participant.creator == contributor);
        assert!(participant_index.is_none(), 2);


        let new_participant = Savings{
            id: object::new(ctx),
            creator: contributor,
            balance: amount
        };

        rotational_savings.base.participants.push_back(new_participant);
        rotational_savings.base.total_balance = rotational_savings.base.total_balance + amount;
        rotational_savings.asset_value = rotational_savings.asset_value + asset_value;
    }

    public fun deposit_to_rotation_savings(
        creators_address: address, 
        contributor: address, 
        amount: u64,
        rotational_savings_list: &mut vector<RotationalSavings>,
        ctx: &mut TxContext,
    ): &mut RotationalSavings {
        // Find the rotational savings by the creator's address
        let mut index: Option<u64> = rotational_savings_list
            .find_index!(|rotational_savings| rotational_savings.base.creator == creators_address);

        // Ensure the savings group exists
        assert!(index.is_some(), 1);
        let savings_index = option::extract(&mut index);

        // Borrow mutable reference to the savings group
        let rotational_savings = vector::borrow_mut(rotational_savings_list, savings_index);

        // Find the contributor
        let mut contributor_index = rotational_savings.base.participants
            .find_index!(|participant| participant.creator == contributor);

        // Update contributor's balance or add a new contributor
        if (contributor_index.is_some()) {
            let index = option::extract(&mut contributor_index);
            let contributor = vector::borrow_mut(&mut rotational_savings.base.participants, index);
            contributor.balance = contributor.balance + amount;
        } else {
            let new_contributor = Savings {
                id: object::new(ctx),
                creator: contributor,
                balance: amount
            };
            rotational_savings.base.participants.push_back(new_contributor);
        };

        // Update the total balance of the rotational savings
        rotational_savings.base.total_balance = rotational_savings.base.total_balance + amount;

        rotational_savings
    }

   public fun withdraw_from_rotation_savings(
        creators_address: address,
        recipient_address: address,
        rotational_savings_list: &mut vector<RotationalSavings>,
    ): u64 {
        // Find the rotational savings by the creator's address
        let mut index: Option<u64> = rotational_savings_list
            .find_index!(|rotational_savings| rotational_savings.base.creator == creators_address);

        // Ensure the savings group exists
        assert!(index.is_some(), 1);
        let savings_index = option::extract(&mut index);

        // Borrow mutable reference to the savings group
        let rotational_savings = vector::borrow_mut( rotational_savings_list, savings_index);

        // Find the recipient
        let mut recipient_index = rotational_savings.base.participants
            .find_index!(|participant| participant.creator == recipient_address);

        // Ensure the recipient exists
        assert!(recipient_index.is_some(), 2);
        let recipient_index = option::extract(&mut recipient_index);

        // Borrow mutable reference to the recipient
        let recipient = vector::borrow_mut(&mut rotational_savings.base.participants, recipient_index);

        // Perform the withdrawal
        let withdrawal_amount = recipient.balance;
        recipient.balance = 0;

        // Update the total balance of the rotational savings
        rotational_savings.base.total_balance = rotational_savings.base.total_balance - withdrawal_amount;

        withdrawal_amount
    }


    public fun get_rotation_savings_contributors(name: String, rotational_savings_registry: &mut RotationalSavingsRegistry): &vector<Savings> {
        //todo
        let mut rotational_savings = rotational_savings_registry.rotational_savings.find_index!(|rotational_savings| rotational_savings.base.name == name);
        assert!(rotational_savings.is_some(), 1);
        let rotational_savings_index = option::extract(&mut rotational_savings);

        let contributors = &rotational_savings_registry.rotational_savings[rotational_savings_index].base.participants;
        contributors
    }
    

    public fun get_rotation_savings_balance(name: String, rotational_savings_registry: &mut RotationalSavingsRegistry): u64 {
        //todo
        let mut rotational_savings = rotational_savings_registry.rotational_savings.find_index!(|rotational_savings| rotational_savings.base.name == name);
        assert!(rotational_savings.is_some(), 1);
        let rotational_savings_index = option::extract(&mut rotational_savings);

        let balance = rotational_savings_registry.rotational_savings[rotational_savings_index].base.total_balance;
        balance
    }
    

    // Community Pool functions
    #[allow(lint(self_transfer))]
    public fun create_community_pool(name: String, creator: address, goal_amount: u64, distribution_policy: String, amount_per_cycle: u64, ctx: &mut TxContext) {
        //todo
        let mut community_pool = CommunityPool{
            id: object::new(ctx),
            base: CommunitySavings{
                name,
                creator,
                participants: vector::empty<Savings>(),
                total_balance: 0,
                is_active: false,
                creation_date: 0,
                end_date: 0
            },
            goal_amount,
            contributors: vector::empty<Savings>(),
            contribution_history: vector::empty<u64>(),
            distribution_policy,
            amount_per_cycle
        };  
        let creator_savings = Savings{
            id: object::new(ctx),
            creator,
            balance: 0
        };

        community_pool.base.participants.push_back(creator_savings);

        transfer::transfer(community_pool, ctx.sender())
    }

    public fun join_community_pool(
        creator: address, 
        contributor: address, 
        amount: u64, 
        community_pool_list: &mut vector<CommunityPool>,
        ctx: &mut TxContext
    ) {
        //todo
        let mut community_pool = community_pool_list.find_index!(|community_pool| community_pool.base.creator == creator);
        assert!(community_pool.is_some(), 1);

        let community_pool_index = option::extract(&mut community_pool);

        let community_pool = vector::borrow_mut(community_pool_list, community_pool_index);

        let participant_index = community_pool.base.participants.find_index!(|participant| participant.creator == contributor);
        assert!(participant_index.is_none(), 2);

        let new_participant = Savings{
            id: object::new(ctx),
            creator: contributor,
            balance: amount
        };

        community_pool.base.participants.push_back(new_participant);
        community_pool.base.total_balance = community_pool.base.total_balance + amount;
    }
       
    #[allow(unused_mut_ref)]
    public fun find_community_pool(community_pool_registry: &mut CommunityPoolRegistry, creator: address): &CommunityPool {
        //todo
        let mut index: Option<u64> = community_pool_registry.community_pools.find_index!(|community_pool| community_pool.base.creator == creator);
        assert!(index.is_some(), 1);
        // Extract the index value safely
        let community_pool_index = option::extract(&mut index);

        // Borrow the user from the vector at the extracted index
        let community_pool = vector::borrow(&mut community_pool_registry.community_pools, community_pool_index);

        (community_pool)
    }

    public fun deposit_to_community_pool(
        creator: address, 
        contributor: address, 
        amount: u64, 
        community_pool_list: &mut vector<CommunityPool>,
        ctx: &mut TxContext
    ): &mut CommunityPool {
        // Ensure the deposit amount is positive
        assert!(amount > 0, 1);

        // Find the community pool created by the given creator
        let mut index: Option<u64> = community_pool_list
            .find_index!(|community_pool| community_pool.base.creator == creator);
        
        assert!(index.is_some(), 2); // Ensure the creator exists
        let pool_index = option::extract(&mut index);

        // Borrow mutable reference to the community pool
        let community_pool = vector::borrow_mut(community_pool_list, pool_index);

        // Find the contributor
        let mut contributor_index = community_pool.base.participants
            .find_index!(|participant| participant.creator == contributor);
        
        // Update contributor's balance or add a new contributor
        if (contributor_index.is_some()) {
            let index = option::extract(&mut contributor_index);
            let contributor = vector::borrow_mut(&mut community_pool.base.participants, index);
            contributor.balance = contributor.balance + amount;
        } else {
            let new_contributor = Savings {
                id: object::new(ctx),
                creator: contributor,
                balance: amount
            };
            community_pool.base.participants.push_back(new_contributor);
        };

        // Update the total balance of the community pool
        community_pool.base.total_balance = community_pool.base.total_balance + amount;

        community_pool
    }

    public fun withdraw_from_community_pool(
        creator: address,
        contributor: address,
        community_pool_list: &mut vector<CommunityPool>,
    ): u64 {
        // Find the community pool by the creator's address
        let mut index: Option<u64> = community_pool_list
            .find_index!(|community_pool| community_pool.base.creator == creator);

        // Ensure the pool exists
        assert!(index.is_some(), 1);
        let pool_index = option::extract(&mut index);

        // Borrow mutable reference to the pool
        let community_pool = vector::borrow_mut(community_pool_list, pool_index);

        // Find the contributor
        let mut contributor_index = community_pool.base.participants
            .find_index!(|participant| participant.creator == contributor);

        // Ensure the contributor exists
        assert!(contributor_index.is_some(), 2);
        let contributor_index = option::extract(&mut contributor_index);

        // Borrow mutable reference to the contributor
        let contributor = vector::borrow_mut(&mut community_pool.base.participants, contributor_index);

        // Perform the withdrawal
        let withdrawal_amount = contributor.balance;
        contributor.balance = 0;

        // Update the total balance of the community pool
        community_pool.base.total_balance = community_pool.base.total_balance - withdrawal_amount;

        withdrawal_amount
    }

    public fun get_community_pool_contributors(name: String, community_pool_registry: &mut CommunityPoolRegistry): &vector<Savings> {
        //todo
        let mut community_pool = community_pool_registry.community_pools.find_index!(|community_pool| community_pool.base.name == name);
        assert!(community_pool.is_some(), 1);
        let community_pool_index = option::extract(&mut community_pool);

        let contributors = &community_pool_registry.community_pools[community_pool_index].base.participants;
        contributors
    }

    public fun get_community_pool_balance(name: String, community_pool_registry: &mut CommunityPoolRegistry): u64 {
        //todo
        let mut community_pool = community_pool_registry.community_pools.find_index!(|community_pool| community_pool.base.name == name);
        assert!(community_pool.is_some(), 1);
        let community_pool_index = option::extract(&mut community_pool);

        let balance = community_pool_registry.community_pools[community_pool_index].base.total_balance;
        balance
    }

    // Leaderboard Savings functions
    #[allow(lint(self_transfer))]
    public fun create_leaderboard_savings(name: String, creator: address,  reward_threshold: u64, rewards_pool: u64, reward_policy: String, ctx: &mut TxContext) {
        //todo
        let mut leaderboard_savings = LeaderboardSavings{
            id: object::new(ctx),
            base: CommunitySavings{
                name,
                creator,
                participants: vector::empty<Savings>(),
                total_balance: 0,
                is_active: false,
                creation_date: 0,
                end_date: 0
            },
            leaderboard: LeaderboardEntry{
                participant: vector::empty<address>()
            },
            reward_threshold,
            rewards_pool,
            ranking_date: 0,
            reward_policy
        };

        let creator_savings = Savings{
            id: object::new(ctx),
            creator,
            balance: 0
        };

        leaderboard_savings.base.participants.push_back(creator_savings);
        leaderboard_savings.leaderboard.participant.push_back(creator);

        transfer::transfer(leaderboard_savings, ctx.sender())

    }

    public fun join_leaderboard_savings(
        creator: address, 
        contributor: address, 
        amount: u64, 
        leaderboard_savings_list: &mut vector<LeaderboardSavings>,
        ctx: &mut TxContext
    ) {
        //todo
        let mut leaderboard_savings = leaderboard_savings_list.find_index!(|leaderboard_savings| leaderboard_savings.base.creator == creator);
        assert!(leaderboard_savings.is_some(), 1);

        let leaderboard_savings_index = option::extract(&mut leaderboard_savings);

        let leaderboard_savings = vector::borrow_mut(leaderboard_savings_list, leaderboard_savings_index);

        let participant_index = leaderboard_savings.base.participants.find_index!(|participant| participant.creator == contributor);
        assert!(participant_index.is_none(), 2);

        let new_participant = Savings{
            id: object::new(ctx),
            creator: contributor,
            balance: amount
        };

        leaderboard_savings.base.participants.push_back(new_participant);
        leaderboard_savings.base.total_balance = leaderboard_savings.base.total_balance + amount;
    }

    public fun deposit_to_leaderboard_savings(
        creator: address, 
        contributor: address, 
        amount: u64, 
        leaderboard_savings_list: &mut vector<LeaderboardSavings>,
        ctx: &mut TxContext
    ): &mut LeaderboardSavings {
        // Ensure the deposit amount is positive
        assert!(amount > 0, 1);

        // Find the leaderboard savings created by the given creator
        let mut index: Option<u64> = leaderboard_savings_list
            .find_index!(|leaderboard_savings| leaderboard_savings.base.creator == creator);
        
        assert!(index.is_some(), 2); // Ensure the creator exists
        let savings_index = option::extract(&mut index);

        // Borrow mutable reference to the leaderboard savings
        let leaderboard_savings = vector::borrow_mut(leaderboard_savings_list, savings_index);

        // Find the contributor
        let mut contributor_index = leaderboard_savings.base.participants
            .find_index!(|participant| participant.creator == contributor);
        
        // Update contributor's balance or add a new contributor
        if (contributor_index.is_some()) {
            let index = option::extract(&mut contributor_index);
            let contributor = vector::borrow_mut(&mut leaderboard_savings.base.participants, index);
            contributor.balance = contributor.balance + amount;
        } else {
            let new_contributor = Savings {
                id: object::new(ctx),
                creator: contributor,
                balance: amount
            };
            leaderboard_savings.base.participants.push_back(new_contributor);
        };

        // Update the total balance of the leaderboard savings
        leaderboard_savings.base.total_balance = leaderboard_savings.base.total_balance + amount;

        leaderboard_savings
    }

    public fun withdraw_from_leaderboard_saving(
        creator: address,
        contributor: address,
        leaderboard_savings_list: &mut vector<LeaderboardSavings>,
    ): u64 {
        // Find the leaderboard savings by the creator's address
        let mut index: Option<u64> = leaderboard_savings_list
            .find_index!(|leaderboard_savings| leaderboard_savings.base.creator == creator);

        // Ensure the savings group exists
        assert!(index.is_some(), 1);
        let savings_index = option::extract(&mut index);

        // Borrow mutable reference to the savings group
        let leaderboard_savings = vector::borrow_mut(leaderboard_savings_list, savings_index);

        // Find the contributor
        let mut contributor_index = leaderboard_savings.base.participants
            .find_index!(|participant| participant.creator == contributor);

        // Ensure the contributor exists
        assert!(contributor_index.is_some(), 2);
        let contributor_index = option::extract(&mut contributor_index);

        // Borrow mutable reference to the contributor
        let contributor = vector::borrow_mut(&mut leaderboard_savings.base.participants, contributor_index);

        // Perform the withdrawal
        let withdrawal_amount = contributor.balance;
        contributor.balance = 0;

        // Update the total balance of the leaderboard savings
        leaderboard_savings.base.total_balance = leaderboard_savings.base.total_balance - withdrawal_amount;

        withdrawal_amount
    }
    
    #[allow(unused_mut_ref)]
    public fun find_leaderboard_savings(leader_board_savings_registry: &mut LeaderboardSavingsRegistry, creator: address): &LeaderboardSavings {
        //todo
        let mut index: Option<u64> = leader_board_savings_registry.leadership.find_index!(|leaderboard_savings| leaderboard_savings.base.creator == creator);
        assert!(index.is_some(), 1);
        // Extract the index value safely
        let leaderboard_savings_index = option::extract(&mut index);

        // Borrow the user from the vector at the extracted index

        let leaderboard_savings = vector::borrow(&mut leader_board_savings_registry.leadership, leaderboard_savings_index);
        leaderboard_savings

    }

    
  




}

